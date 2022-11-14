import React from "react"
import PropTypes from "prop-types"

const Post = ({ title, body }) => {
    return (
        <>
            <div className="tsa_scrollbar tsa_height">
                <p>
                    <h1>{title}</h1>
                </p>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
                <div>{body}</div>
            </div>
        </>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string
}

export default Post
