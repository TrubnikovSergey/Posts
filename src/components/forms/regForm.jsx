import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import InputField from "../formField/inputField"
import * as yup from "yup"
import RadioField from "../formField/radioField"

const RegForm = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        sex: "male"
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        validateScheme
            .validate(data)
            .then(() => setError({}))
            .catch((err) => setError({ [err.path]: err.message }))
    }, [data])

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
            .length(8, "Проль должен быть минимум 8 символов"),
        email: yup
            .string()
            .required("Электронная почта обязательная для заполнения")
            .email("Email введен не корректно"),
        name: yup.string().required("Имя обязательно для заполнения")
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(error)
        if (Object.keys(error).length === 0) {
            console.log("OK")
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <div className="col-4 d-flex flex-column">
                        <div className="m-1">
                            <InputField
                                label="Name"
                                name="name"
                                value={data.name}
                                type="text"
                                onChange={handleChange}
                                error={error}
                            />
                        </div>
                        <div className="m-1">
                            <InputField
                                label="Email"
                                name="email"
                                value={data.email}
                                type="text"
                                onChange={handleChange}
                                error={error}
                            />
                        </div>
                        <div className="m-1">
                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                error={error}
                            />
                        </div>
                        <div>
                            <RadioField
                                items={["male", "female"]}
                                onChange={handleChange}
                                elementInLine={true}
                                name="sex"
                                label="sex"
                                value={data.sex}
                            />
                        </div>
                    </div>
                    <div className="d-flex m-1 align-self-stretch">
                        <button className="btn btn-primary">
                            Registration
                        </button>
                    </div>
                </div>
                <br />
                <div className="d-flex justify-content-center">
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </>
    )
}

export default RegForm
