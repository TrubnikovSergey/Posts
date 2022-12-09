import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import localStorageService from "../../service/localStorage.service"
import { getUserPostsList } from "../../store/postsSlice"
import {
    getTypePostsList,
    toggleViewPostsList
} from "../../store/viewPostsListSlice"
import PostsList from "../postsList"

const AdminForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const type = useSelector(getTypePostsList())
    const { userId } = localStorageService.getAuthUser()

    const postsList = useSelector(getUserPostsList(userId))

    const handleClick = () => {
        navigate("/admin/new")
    }

    const handleChange = () => {
        dispatch(toggleViewPostsList())
    }

    return (
        <>
            <div className="d-flex">
                <div className="me-auto">
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleClick}
                    >
                        CREATE POST
                    </button>
                </div>
                <div className="me-2 bi bi-grid-3x3-gap-fill"></div>
                <div className="form-check form-switch">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="button"
                        checked={type !== "list"}
                        onChange={handleChange}
                    />
                    <br />
                </div>
            </div>
            <div className="mt-5">
                <PostsList
                    items={postsList}
                    endPoint="/admin/"
                    extended={true}
                />
            </div>
        </>
    )
}

export default AdminForm
