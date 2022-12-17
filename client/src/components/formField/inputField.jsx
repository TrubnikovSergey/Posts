import React, { useState } from "react"
import PropTypes from "prop-types"

const InputField = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    onKeyDown,
    error
}) => {
    const isError = error && Object.keys(error).length > 0 && name in error
    const className = isError ? " is-invalid" : ""
    const [toggle, setToggle] = useState(false)

    const toggleShowPassword = () => {
        setToggle((prev) => (prev = !prev))
    }

    return (
        <div className="m-1">
            {label ? <label htmlFor={name}>{label}</label> : null}

            <div className="input-group">
                <input
                    className={`rounded form-control${className}`}
                    name={name}
                    id={name}
                    type={toggle ? "text" : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                {type === "password" ? (
                    <span
                        className={
                            toggle
                                ? "input-group-text bi bi-eye"
                                : "input-group-text bi bi-eye-slash"
                        }
                        role="button"
                        onClick={toggleShowPassword}
                    ></span>
                ) : null}
                {isError ? (
                    <div className="invalid-feedback">{error[name]}</div>
                ) : null}
            </div>
        </div>
    )
}

InputField.defaultProps = {
    type: "text"
}

InputField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.object,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func
}

export default InputField
