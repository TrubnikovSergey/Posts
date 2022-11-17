import React from "react"
import PropTypes from "prop-types"

const InputField = ({
    label,
    name,
    type,
    placeholder,
    value,
    onChange,
    error
}) => {
    const isError = error && name in error
    const className = isError ? " is-invalid" : ""

    return (
        <div className="m-1">
            <label htmlFor={name}>{label ? `${label}` : ""}</label>
            <input
                className={`form-control${className}`}
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {isError ? (
                <div className="invalid-feedback">{error[name]}</div>
            ) : null}
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
    onChange: PropTypes.func
}

export default InputField
