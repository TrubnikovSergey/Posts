import React from "react"
import { useParams } from "react-router-dom"
import LoginForm from "../components/forms/loginForm"
import RegForm from "../components/forms/regForm"

const Login = () => {
    const { reg } = useParams()

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
                    {reg ? <RegForm /> : <LoginForm />}
                </div>
            </div>
        </div>
    )
}

export default Login
