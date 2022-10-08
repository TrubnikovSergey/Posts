import React from "react"
import { Link } from "react-router-dom"
import InputField from "../formField/inputField"

const RegForm = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                    <div className="m-1">
                        <InputField label="Email" name="Email" type="text" />
                    </div>
                    <div className="m-1">
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                        />
                    </div>
                </div>
                <div className="align-self-stretch">
                    <button>Registration</button>
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Link to="/login">Login</Link>
            </div>
        </>
    )
}

export default RegForm
