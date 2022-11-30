import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { signOut } from "../store/authUserSlice"

const Logout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(signOut())
    }, [])
    return <Navigate to="/" />
}

export default Logout
