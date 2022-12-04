import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getIsAuth } from "../store/authUserSlice"

const PrivatePage = ({ children }) => {
    const isAuth = useSelector(getIsAuth())
    if (isAuth) {
        return children
    } else {
        return <Navigate to="/login" />
    }
}

PrivatePage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default PrivatePage
