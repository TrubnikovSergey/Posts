import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const PostContext = React.createContext()

export const usePost = () => {
    return useContext(PostContext)
}

const PostPeovider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((respons) => respons.json())
            .then((data) => {
                setLoading(false)
                return setPosts(data)
            })
    }, [])

    function getPostById(id) {
        return posts.find((item) => item._id === id)
    }

    return (
        <PostContext.Provider value={{ posts, getPostById }}>
            {!isLoading ? children : "Loading..."}
        </PostContext.Provider>
    )
}

PostPeovider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default UserProvider
