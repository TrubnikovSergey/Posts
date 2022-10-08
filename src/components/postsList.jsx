import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const PostsList = ({ items }) => {
    return (
        <>
            <div id="PostList">
                {items.map((post) => (
                    <Link key={post.id} to={`/${post.id}`}>
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
    header: PropTypes.string
}

export default PostsList
