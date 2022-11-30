import React from "react"
import { Outlet } from "react-router-dom"
// import Container from "../components/container"

const LayoutLogin = () => {
    return (
        // <Container>
        <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
            <Outlet />
        </div>
        // </Container>
    )
}

export default LayoutLogin
