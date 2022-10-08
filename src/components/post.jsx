import React from "react"
import PropTypes from "prop-types"

const Post = ({ title, body }) => {
    return (
        <>
            <h1>{title}</h1>
            <br></br>
            <div className="tsa_scrollbar tsa_height">
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
