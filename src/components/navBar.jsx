import React from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getIsAuth, getIsAuthLoading } from "../store/authUserSlice"

const NavBar = () => {
    const isAuth = useSelector(getIsAuth())
    const isAuthLoading = useSelector(getIsAuthLoading())

    let renderMenu = null

    if (!isAuth) {
        if (!isAuthLoading) {
            renderMenu = (
                <NavLink to="/login" className="nav-link">
                    Login
                </NavLink>
            )
        } else {
            renderMenu = "...loading..."
        }
    } else {
        renderMenu = (
            <>
                <li className="nav-item">
                    <NavLink to="/logout" className="nav-link">
                        Logout
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin" className="nav-link">
                        Admin
                    </NavLink>
                </li>
            </>
        )
    }

    return (
        <>
            <ul className="nav justify-content-center nav-pills">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                </li>
                {renderMenu}
            </ul>
        </>
    )
}

export default NavBar
