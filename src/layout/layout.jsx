import React from "react"
import { Outlet } from "react-router-dom"
import Container from "../components/container"
import NavBar from "../components/navBar"

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
            <Container>
                <Outlet />
            </Container>
        </>
    )
}

export { Layout }
