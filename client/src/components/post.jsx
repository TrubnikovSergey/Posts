import React from "react"
import PropTypes from "prop-types"
import Loader from "./loader"

const Post = ({ post }) => {
    return post ? (
        <>
            <div>
                <div className="mb-5">
                    <h1>{post.title}</h1>
                </div>
                <div
                    className="tsa-white-space"
                    dangerouslySetInnerHTML={{ __html: post.body }}
                />
            </div>
        </>
    ) : (
        <Loader />
    )
}

Post.propTypes = {
    post: PropTypes.object
}

export default Post
