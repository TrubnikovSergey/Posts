import React from "react"
import { Link } from "react-router-dom"
import InputField from "../formField/inputField"

const LoginForm = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                    <div className="m-1">
                        <InputField label="Email" type="text" />
                    </div>
                    <div className="m-1">
                        <InputField label="Password" type="password" />
                    </div>
                </div>
                <div className="align-self-stretch">
                    <button>Login</button>
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
