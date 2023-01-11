import React from "react"
import { Outlet } from "react-router-dom"

const LayoutLogin = () => {
    return (
        <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
            <Outlet />
        </div>
    )
}

export default LayoutLogin
