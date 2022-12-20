import React, { Navigate, Route, Routes } from "react-router-dom"
import Home from "./components/page/home"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import AdminPage from "./components/page/admin"
import { useDispatch, useSelector } from "react-redux"
import {
    getPaginate,
    getPostsList,
    postsFetchAll,
    postsFetchPaginate
} from "./store/postsSlice"
import { Layout } from "./layout/layout"
import RegForm from "./components/forms/regForm"
import LayoutLogin from "./layout/layoutLogin"
import LoginForm from "./components/forms/loginForm"
import "react-toastify/dist/ReactToastify.css"
import Logout from "./components/logout"
import PrivatePage from "./components/privatePage"
import localStorageService from "./service/localStorage.service"
import { getAuthError, getIsAuth, signInWithToken } from "./store/authUserSlice"
import { useEffect } from "react"
import EditPostPage from "./components/page/editPostPage"
import Loader from "./components/loader"
import { toast } from "react-toastify"
import LayoutAdmin from "./layout/layoutAdmin"

function App() {
    const dispatch = useDispatch()
    const authUser = localStorageService.getAuthUser()
    const postsList = useSelector(getPostsList())
    const paginate = useSelector(getPaginate())
    const authError = useSelector(getAuthError())
    const isAuth = useSelector(getIsAuth())

    useEffect(() => {
        if (authUser && !isAuth && authError) {
            toast.error(authError)
        }
    }, [isAuth, authError])

    useEffect(() => {
        if (authUser) {
            dispatch(signInWithToken(authUser))
        }
        dispatch(postsFetchPaginate(0, paginate.sizePage))
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path=":postId" element={<Home />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="login" element={<LayoutLogin />}>
                        <Route index element={<LoginForm />} />
                        <Route path=":reg" element={<RegForm />} />
                    </Route>
                    <Route
                        path="admin"
                        element={
                            <PrivatePage>
                                <LayoutAdmin />
                            </PrivatePage>
                        }
                    >
                        <Route index element={<AdminPage />} />
                        <Route path=":postId" element={<EditPostPage />} />
                        <Route path="new" element={<EditPostPage />} />
                    </Route>
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
