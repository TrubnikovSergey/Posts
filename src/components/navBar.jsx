import React from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
    const handlerSetActiveClass = (e) => {
        const children = e.target.parentElement.parentElement.children
        const selectedParentElement = e.target.parentElement
        const selectedElement = e.target

        for (let i = 0; i < children.length; i++) {
            if (children[i] === selectedParentElement) {
                selectedElement.classList.add("active")
            } else {
                children[i].lastChild.classList.remove("active")
            }
        }
    }

    return (
        <>
            <ul
                className="nav justify-content-center nav-pills"
                onClick={handlerSetActiveClass}
            >
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/search" className="nav-link">
                        Search
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                        Admin
                    </Link>
                </li>
            </ul>
        </>
    )
}

export default NavBar
