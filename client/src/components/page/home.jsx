import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import { useSelector } from "react-redux"
import { getPaginate } from "../../store/postsSlice"
import SearchForm from "../forms/searchForm"
import Pagination from "../pagination"
import utils from "../../util"
import postService from "../../service/post.service"

const Home = () => {
    const { sizePage, sizeListPaginate } = useSelector(getPaginate())
    const { postId } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsList, setPostsList] = useState([])
    const [post, setPost] = useState()
    const [firstPagePaginate, setFirstPagePaginate] = useState(1)
    const [totalCountPosts, setTotalCountPosts] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [toggle, setToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const [registr, setRegistr] = useState(false)
    const [sortType, setSortType] = useState("asc")

    const handleClickRegistr = () => {
        setRegistr((prev) => !prev)
    }
    const handleClickSearch = (value) => {
        setSearchValue(value)

        if (value) {
            setToggle((prev) => !prev)

            setCurrentPage(1)
            setFirstPagePaginate(1)
            setPostsList([])
        }
    }
    const handleClickSort = (target) => {
        if (target.classList.contains("bi-sort-down-alt")) {
            setSortType("asc")
        } else {
            setSortType("desc")
        }

        setCurrentPage(1)
        setPostsList([])
    }

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
            setIsLoading(true)

            const idx = (currentPage - 1) * sizePage

            postService
                .fetchPaginateWithSearch({
                    searchValue,
                    sortType,
                    registr,
                    startIndex: idx,
                    count: sizePage
                })
                .then((data) => {
                    setPostsList(data.postsList)
                    setTotalCountPosts(data.totalCount)
                    setIsLoading(false)
                })
        } else {
            const idx = (currentPage - 1) * sizePage
            setIsLoading(true)

            postService
                .fetchPaginate({ startIndex: idx, count: sizePage, sortType })
                .then((data) => {
                    setPostsList(data.postsList)
                    setTotalCountPosts(data.totalCount)
                    setIsLoading(false)
                })
        }
    }, [currentPage, searchValue, sortType, toggle])

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

    const listPage = utils.paginate.calculateListPage(
        firstPagePaginate,
        sizePage,
        totalCountPosts,
        sizeListPaginate
    )

    return (
        <>
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <SearchForm
                        onClickSearch={handleClickSearch}
                        onClickSort={handleClickSort}
                        onClickRegistr={handleClickRegistr}
                        registr={registr}
                    />
                </div>
                <div
                    className="d-inline-block"
                    style={{ width: "100%", height: sizePage * 60 + "px" }}
                >
                    <PostsList items={postsList} isLoading={isLoading} />
                </div>
                <Pagination
                    listPage={listPage}
                    onSelectPage={handleSelectPage}
                    currentPage={currentPage}
                />
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {postId ? <Post post={post} /> : null}
            </div>
        </>
    )
}

export default Home
