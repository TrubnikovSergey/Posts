import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import { useSelector } from "react-redux"
import { getPaginate, getPostById, getPostsList } from "../../store/postsSlice"
import SearchForm from "../forms/searchForm"
import useSearchSort from "../../hooks/useSearchSort"
import Pagination from "../pagination"
import utils from "../../util"

const Home = () => {
    const [currentPage, setCurrentPage] = useState()

    const postsList = useSelector(getPostsList())
    const { postId } = useParams()
    const paginate = useSelector(getPaginate())
    const onePost = useSelector(getPostById(postId))
    const {
        newPostList,
        handleClickSort,
        handleClickSearch,
        handleClickRegistr,
        registr
    } = useSearchSort(postsList)
    console.log("----Home")
    let renderPostsList = null
    let renderPost = null

    renderPostsList = <PostsList items={newPostList} />

    if (postId && onePost) {
        renderPost = <Post title={onePost.title} body={onePost.body} />
    }

    const calculateCountPages = (pgn) => {
        return utils.div(pgn.totalCount / pgn.sizePage)
    }

    const handleChangePage = () => {
        console.log("-----handleChangePage")
    }

    const handleSelectPage = (page) => {
        setCurrentPage(page)
    }

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
                <div className="tsa_scrollbar tsa_height">
                    {renderPostsList}
                </div>
                <Pagination
                    listPage={utils.getArrayNumbers(4)}
                    onSelectPage={handleSelectPage}
                    currentPage={currentPage}
                />
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {renderPost}
            </div>
        </>
    )
}

export default Home
