import React from "react"
// import { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useSearchPaginate from "../../hooks/useSearchPaginate"
import localStorageService from "../../service/localStorage.service"
import { getAuthUser } from "../../store/authUserSlice"
import {
    getTypePostsList,
    toggleViewPostsList
} from "../../store/viewPostsListSlice"
import utils from "../../util"
import Pagination from "../pagination"
import PostsList from "../postsList"
import SearchForm from "./searchForm"

const AdminForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const type = useSelector(getTypePostsList())
    const { userId } = localStorageService.getAuthUser()
    const authUser = useSelector(getAuthUser())

    const handleClickCreate = () => {
        navigate("/admin/new")
    }

    const handleChangeView = () => {
        dispatch(toggleViewPostsList())
    }

    const {
        sizePage,
        sizeListPaginate,
        currentPage,
        firstPagePaginate,
        totalCountPosts,
        isLoading,
        registr,
        postsList,
        handleSelectPage,
        handleClickSort,
        handleClickSearch,
        handleClickRegistr
    } = useSearchPaginate(userId)

    const listPage = utils.paginate.calculateListPage(
        firstPagePaginate,
        sizePage,
        totalCountPosts,
        sizeListPaginate
    )

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

                <div className="me-5 ms-5">
                    <div>
                        <h4 className="m-0">User: {authUser.name}</h4>
                        <h5 className="m-0">email: {authUser.email}</h5>
                    </div>
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
                <SearchForm
                    onClickSearch={handleClickSearch}
                    onClickSort={handleClickSort}
                    onClickRegistr={handleClickRegistr}
                    registr={registr}
                />
                <Pagination
                    listPage={listPage}
                    onSelectPage={handleSelectPage}
                    currentPage={currentPage}
                />
                <PostsList
                    items={postsList}
                    endPoint="/admin/"
                    extended={true}
                    isLoading={isLoading}
                />
            </div>
        </>
    )
}

export default AdminForm
