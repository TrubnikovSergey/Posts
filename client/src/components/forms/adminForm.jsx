import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useSearch from "../../hooks/useSearch"
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
    const userPosts = useSelector(getUserPostsList(userId))

    const { searchComponent, searchValue, foundPosts } = useSearch(userPosts)

    const handleClickCreate = () => {
        navigate("/admin/new")
    }

    const handleChangeView = () => {
        dispatch(toggleViewPostsList())
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div>
                    <button
                        className="btn btn-primary mt-2"
                        onClick={handleClickCreate}
                    >
                        CREATE POST
                    </button>
                </div>
                <div className="d-flex">
                    <div className="me-2 bi bi-grid-3x3-gap-fill"></div>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="button"
                            checked={type !== "list"}
                            onChange={handleChangeView}
                        />
                        <br />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                {searchComponent}
                <PostsList
                    items={searchValue ? foundPosts : userPosts}
                    endPoint="/admin/"
                    extended={true}
                />
            </div>
        </>
    )
}

export default AdminForm
