import React from "react"
import { Link } from "react-router-dom"
import InputField from "../formField/inputField"

const LoginForm = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="d-flex flex-column">
                    <div className="d-flex justify-content-end m-1">
                        <InputField label="Email" type="text" />
                    </div>
                    <div className="m-1">
                        <InputField label="Password" type="password" />
                    </div>
                </div>
                <div className="d-flex m-1 align-self-stretch">
                    <button className="btn btn-primary">Login</button>
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Link to="/login/reg">Registration</Link>
            </div>
        </>
    )
}

export default LoginForm
