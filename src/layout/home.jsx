import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Post from "../components/post"
import PostsList from "../components/postsList"
import Loader from "../components/loader"
import getPostById from "../util/findePostById"
// import Pagination from "../components/pagination"
import paginate from "../util/paginate"

const Home = () => {
    const [posts, setPosts] = useState()
    const [currentPage, setCurrentPage] = useState()
    const { postId } = useParams()
    // const pageSize = 9
    // const paginationSize = 3

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((respons) => respons.json())
            .then((data) => {
                setCurrentPage(1)
                return setPosts(data)
            })
    }, [])

    // const handleChangePage = (page) => {
    //     setCurrentPage(page)
    // }

    let renderPostsList = null
    let renderPost = null

    if (posts) {
        const cropPost = paginate(posts, currentPage)
        console.log(posts)
        renderPostsList = (
            <>
                {/* <Pagination
                    totalCountPages={Math.round(posts.length / pageSize)}
                    paginationSize={paginationSize}
                    handleChangePage={handleChangePage}
                    currentPage={currentPage}
                /> */}
                <PostsList items={cropPost} header="Users" />
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
            <div className="row justify-content-center">
                <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                    <div>
                        <h1>Posts</h1>
                    </div>
                    <div className="tsa_scrollbar tsa_height">
                        {renderPostsList}
                    </div>
                </div>
                <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                    {renderPost}
                </div>
            </div>
        </div>
    )
}

export default Home
