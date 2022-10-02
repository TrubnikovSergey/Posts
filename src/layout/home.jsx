import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Post from "../components/post"
import PostsList from "../components/postsList"
import Loader from "../components/loader"
import getPostById from "../util/findePostById"
import Pagination from "../components/pagination"

const Home = () => {
    const [posts, setPosts] = useState()
    const [currentPage, setCurrentPage] = useState()
    const { postId } = useParams()
    const pageSize = 9
    const paginationSize = 3

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((respons) => respons.json())
            .then((data) => {
                setCurrentPage(1)
                return setPosts(data)
            })
    }, [])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    let renderPostsList = null
    let renderPost = null

    if (posts) {
        renderPostsList = (
            <>
                <Pagination
                    totalCountPages={Math.round(posts.length / pageSize)}
                    paginationSize={paginationSize}
                    handleChangePage={handleChangePage}
                    currentPage={currentPage}
                />
                <PostsList items={posts} header="Posts" />
            </>
        )

        if (postId) {
            const findePost = getPostById(postId, posts)
            renderPost = <Post title={findePost.title} body={findePost.body} />
        }
    } else {
        renderPostsList = <Loader />
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-evenly">
                <div className="col-4 shadow-lg p-3 mb-5 bg-body rounded">
                    {renderPostsList}
                </div>

                <div className="col-7 shadow-lg p-3 mb-5 bg-body rounded">
                    {renderPost}
                </div>
            </div>
        </div>
    )
}

export default Home
