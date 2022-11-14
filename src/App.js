import React, { Route, Routes } from "react-router-dom"
import Home from "./components/page/home"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import AdminPage from "./components/page/admin"
import { useDispatch } from "react-redux"
import { postsFetchAll } from "./store/postsSlice"
import { useEffect } from "react"
import { Layout } from "./layout/layout"
import RegForm from "./components/forms/regForm"
import LayoutLogin from "./layout/layoutLogin"
import LoginForm from "./components/forms/loginForm"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(postsFetchAll())
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path=":postId" element={<Home />} />
                    <Route path="login" element={<LayoutLogin />}>
                        <Route index element={<LoginForm />} />
                        <Route path=":reg" element={<RegForm />} />
                    </Route>
                    <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
