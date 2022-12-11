import React, { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import { useSelector } from "react-redux"
import SearchForm from "../forms/serachForm"
import { getPostById, getPostsList } from "../../store/postsSlice"
import useSearch from "../../hooks/useSearch"

const Home = () => {
    const postsListInit = useSelector(getPostsList())
    const { postId } = useParams()
    const onePost = useSelector(getPostById(postId))
    const { foundPost, handleFound, handleSort } = useSearch(postsListInit)

    let renderPostsList = null
    let renderPost = null

    renderPostsList = (
        <>
            <PostsList items={foundPost} header="Users" />
        </>
    )

    if (postId && onePost) {
        renderPost = <Post title={onePost.title} body={onePost.body} />
    }

    return (
        <>
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <SearchForm
                        posts={postsListInit}
                        onFound={handleFound}
                        onSort={handleSort}
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
