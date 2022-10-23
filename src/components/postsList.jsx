import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const PostsList = ({ items, endPoint = "/" }) => {
    return (
        <>
            <div id="PostList">
                {items.map((post) => (
                    <Link key={post.id} to={endPoint + post.id}>
                        {post.title}
                        <hr />
                    </Link>
                ))}
            </div>
        </>
    )
}

PostsList.propTypes = {
    items: PropTypes.array,
    endPoint: PropTypes.string
}

export default PostsList
