import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import localStorageService from "../../service/localStorage.service"
import { getUserPostsList } from "../../store/postsSlice"
import PostsList from "../postsList"

const AdminForm = () => {
    const navigate = useNavigate()
    const { userId } = localStorageService.getAuthUser()

    const postsList = useSelector(getUserPostsList(userId))

    const handleClick = () => {
        navigate("/admin/new")
    }

    return (
        <>
            <button className="btn btn-primary col-1 m-3" onClick={handleClick}>
                CREATE POST
            </button>

            <div>
                <PostsList items={postsList} endPoint="/admin/" />
            </div>
        </>
    )
}

export default AdminForm
