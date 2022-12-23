import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import { useSelector } from "react-redux"
import { getPaginate, getPostById, getPostsList } from "../../store/postsSlice"
// import SearchForm from "../forms/searchForm"
// import useSearchSort from "../../hooks/useSearchSort"
import Pagination from "../pagination"
import utils from "../../util"
import postService from "../../service/post.service"
import Loader from "../loader"
import InputField from "../formField/inputField"

const Home = () => {
    const sizePage = 9
    const sizeListPaginate = 2
    const { postId } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsList, setPostsList] = useState()
    const [post, setPost] = useState()
    const [firstPagePaginate, setFirstPagePaginate] = useState(1)
    const [totalCountPosts, setTotalCountPosts] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [toggle, setToggle] = useState(true)

    useEffect(() => {
        if (postId) {
            postService.getPostById(postId).then((data) => {
                setPost(data)
            })

            if (postId !== post?._id) {
                setPost(null)
            }
        }
    }, [postId])

    useEffect(() => {
        if (searchValue) {
            const idx = (currentPage - 1) * sizePage

            postService
                .fetchPaginateWithSearch({
                    searchValue,
                    registr: true,
                    startIndex: idx,
                    count: sizePage
                })
                .then((data) => {
                    setPostsList(data.postsList)
                    setTotalCountPosts(data.totalCount)
                })
        } else {
            const idx = (currentPage - 1) * sizePage

            postService.fetchPaginate(idx, sizePage).then((data) => {
                setPostsList(data.postsList)
                setTotalCountPosts(data.totalCount)
            })
        }
    }, [currentPage, toggle])

    const handleSelectPage = (page) => {
        if (currentPage === page) {
            return
        }

        if (page > 0) {
            setCurrentPage(page)
            setPostsList([])
        } else {
            const isRightExistsPagePginate =
                (firstPagePaginate - 1 + sizeListPaginate) * sizePage <
                totalCountPosts
            const isLeftExistsPagePginate = firstPagePaginate > 1

            if (page === -1 && isRightExistsPagePginate) {
                setFirstPagePaginate(firstPagePaginate + sizeListPaginate)
                setCurrentPage(firstPagePaginate + sizeListPaginate)
            }
            if (page === -2 && isLeftExistsPagePginate) {
                setFirstPagePaginate(firstPagePaginate - sizeListPaginate)
                setCurrentPage(firstPagePaginate - sizeListPaginate)
            }
        }
    }

    const calculateListPage = () => {
        const paginateCountPosts = (firstPagePaginate - 1) * sizePage
        const differencePosts = totalCountPosts - paginateCountPosts

        const isCountPostsSufficeForListPaginate =
            Math.ceil(differencePosts / sizePage) >= sizeListPaginate

        let arrayNumber = []

        if (isCountPostsSufficeForListPaginate) {
            arrayNumber = utils.getArrayNumbers(
                firstPagePaginate + sizeListPaginate
            )
        } else {
            const sizeListPaginateDiff = Math.ceil(differencePosts / sizePage)

            arrayNumber = utils.getArrayNumbers(
                firstPagePaginate + sizeListPaginateDiff
            )
        }

        return arrayNumber.slice(firstPagePaginate - 1)
    }

    const handleSearchInput = ({ target }) => {
        setSearchValue(target.value)
    }

    const handleSearchClick = () => {
        setToggle((prev) => !prev)

        setCurrentPage(1)
        setPostsList([])
    }

    let renderPostsList = null
    let renderPost = null

    renderPostsList = <PostsList items={postsList} />

    if (postId) {
        renderPost = <Post post={post} />
    }

    return postsList ? (
        <>
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <InputField
                        label="Search"
                        value={searchValue}
                        onChange={handleSearchInput}
                    />
                    <button onClick={handleSearchClick}>Search</button>
                    {/* <SearchForm
                        onClickSearch={handleClickSearch}
                        onClickSort={handleClickSort}
                        onClickRegistr={handleClickRegistr}
                        registr={registr}
                    /> */}
                </div>
                <div
                    className="d-inline-block"
                    style={{ width: "100%", height: sizePage * 60 + "px" }}
                >
                    {renderPostsList}
                </div>
                <Pagination
                    listPage={calculateListPage()}
                    onSelectPage={handleSelectPage}
                    currentPage={currentPage}
                />
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {renderPost}
            </div>
        </>
    ) : (
        <Loader />
    )
}

export default Home
