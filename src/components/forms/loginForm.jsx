import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import InputField from "../formField/inputField"
import { getAuthError, getIsAuth, signIn } from "../../store/authUserSlice"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { toast } from "react-toastify"

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState({})
    const authError = useSelector(getAuthError())
    const isAuth = useSelector(getIsAuth())
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Пароль обязателен для заполнения")
            .matches(
                /(?=.*[A-Z])/,
                "Пароль должен содержать хотябы одну заглавную букву"
            )
            .matches(/(?=.*[0-9])/, "Пароль должен содержать хотябы одну цифру")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать один из специальных символов !@#$%^&*"
            )
            .min(8, "Проль должен быть минимум 8 символов"),
        email: yup
            .string()
            .required("Электронная почта обязательная для заполнения")
            .email("Email введен не корректно")
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (!isAuth) {
            if (authError) {
                toast.error(authError)
            }
        } else {
            navigate("/")
        }
    }, [isAuth, authError])

    useEffect(() => {
        validateScheme
            .validate(data)
            .then(() => {
                setError({})
            })
            .catch((err) => setError({ [err.path]: err.message }))
    }, [data])

    const handleLogin = () => {
        if (Object.keys(error).length === 0) {
            dispatch(signIn(data.email, data.password))
        }
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="col-4 d-flex flex-column">
                    <div className="m-1">
                        <InputField
                            label="Email"
                            name="email"
                            type="text"
                            value={data.email || ""}
                            onChange={handleChange}
                            error={error}
                        />
                    </div>
                    <div className="m-1">
                        <InputField
                            name="password"
                            label="Password"
                            type="password"
                            value={data.password || ""}
                            onChange={handleChange}
                            error={error}
                        />
                    </div>
                </div>
                <div className="d-flex m-1 align-self-stretch">
                    <button className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
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
