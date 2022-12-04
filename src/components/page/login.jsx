import React from "react"
import { useParams } from "react-router-dom"
import LoginForm from "../forms/loginForm"
import RegForm from "../forms/regForm"

const Login = () => {
    const { reg } = useParams()

    return (
        <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
            {reg ? <RegForm /> : <LoginForm />}
        </div>
    )
}

export default Login
