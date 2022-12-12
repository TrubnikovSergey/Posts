import React, { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import { useSelector } from "react-redux"
import { getPostById, getPostsList } from "../../store/postsSlice"
import SearchForm from "../forms/searchForm"
import useSearchSort from "../../hooks/useSearchSort"

const Home = () => {
    const postsList = useSelector(getPostsList())
    const { postId } = useParams()
    const onePost = useSelector(getPostById(postId))
    const { newPostList, handleClickSort, handleClickSearch } =
        useSearchSort(postsList)

    let renderPostsList = null
    let renderPost = null

    renderPostsList = <PostsList items={newPostList} />

    if (postId && onePost) {
        renderPost = <Post title={onePost.title} body={onePost.body} />
    }

    return (
        <>
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <SearchForm
                        onClickSearch={handleClickSearch}
                        onClickSort={handleClickSort}
                    />
                </div>
                <div className="tsa_scrollbar tsa_height">
                    {renderPostsList}
                </div>
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {renderPost}
            </div>
        </>
    )
}

export default Home
