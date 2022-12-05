import React, { Route, Routes } from "react-router-dom"
import Home from "./components/page/home"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import AdminPage from "./components/page/admin"
import { useDispatch, useSelector } from "react-redux"
import { getPostsList, postsFetchAll } from "./store/postsSlice"
import { Layout } from "./layout/layout"
import RegForm from "./components/forms/regForm"
import LayoutLogin from "./layout/layoutLogin"
import LoginForm from "./components/forms/loginForm"
import "react-toastify/dist/ReactToastify.css"
import Logout from "./components/logout"
import PrivatePage from "./components/privatePage"
import { getAuthUserLocalStorage } from "./service/localStorage.service"
import { signIn } from "./store/authUserSlice"
import { useEffect } from "react"
import LayoutAdmin from "./layout/layoutAdmin"
import EditPage from "./components/page/editePostPage"
import Loader from "./components/loader"

function App() {
    const dispatch = useDispatch()
    const authUser = getAuthUserLocalStorage()
    const postsList = useSelector(getPostsList())

    useEffect(() => {
        if (authUser) {
            dispatch(signIn(authUser.email))
        }
        dispatch(postsFetchAll())
    }, [])

    return postsList.length > 0 ? (
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
                    <Route path="admin" element={<LayoutAdmin />}>
                        <Route
                            index
                            element={
                                <PrivatePage>
                                    <AdminPage />
                                </PrivatePage>
                            }
                        />
                        <Route path=":postId" element={<EditPage />} />
                    </Route>
                </Route>
            </Routes>
        </>
    ) : (
        <Loader />
    )
}

export default App
