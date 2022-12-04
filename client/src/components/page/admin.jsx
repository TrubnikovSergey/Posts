import React from "react"
import { useSelector } from "react-redux"
import { getAuthUser } from "../../store/authUserSlice"
import { getUserPostsList } from "../../store/postsSlice"
import PostsList from "../postsList"

const AdminPage = () => {
    const user = useSelector(getAuthUser())
    const postsList = useSelector(getUserPostsList(user.id))

    return (
        <>
            <h1>Admin</h1>
            <div>
                <PostsList items={postsList} endPoint="/admin/" />
            </div>
        </>
    )
}

export default AdminPage
