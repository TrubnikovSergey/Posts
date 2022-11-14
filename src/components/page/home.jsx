import React from "react"
import { useParams } from "react-router-dom"
import Post from "../post"
import PostsList from "../postsList"
import Loader from "../loader"
import { useSelector } from "react-redux"
// import Container from "../container"
import SearchForm from "../forms/serachForm"
import { getPostById } from "../../store/postsSlice"

const Home = () => {
    const posts = useSelector((state) => state.posts.entities)
    const { postId } = useParams()
    const findePost = useSelector(getPostById(postId))

    let renderPostsList = null
    let renderPost = null

    if (posts.length) {
        renderPostsList = (
            <>
                <PostsList items={posts} header="Users" />
            </>
        )

        renderPost = findePost ? (
            <Post title={findePost.title} body={findePost.body} />
        ) : null
    } else {
        renderPostsList = <Loader />
    }

    return (
        <>
            {/* <Container> */}
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <SearchForm />
                </div>
                <div className="tsa_scrollbar tsa_height">
                    {renderPostsList}
                </div>
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {renderPost}
            </div>
            {/* </Container> */}
        </>
    )
}

export default Home
