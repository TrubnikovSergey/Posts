import React from "react"
import { Outlet } from "react-router-dom"
import Container from "../components/container"
import NavBar from "../components/navBar"
import { ToastContainer } from "react-toastify"

const Layout = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 shadow p-3 mb-5 bg-body rounded">
                            <NavBar />
                        </div>
                    </div>
                </div>
            </header>
            <div id="content">
                <Container>
                    <Outlet />
                </Container>
                <ToastContainer />
            </div>
            <footer>1111</footer>
        </>
    )
}

export { Layout }
