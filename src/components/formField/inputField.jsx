import React from "react"
import PropTypes from "prop-types"

const InputField = ({ label, name, type, placeholder, value, onChange }) => {
    return (
        <div className="m-1">
            <label htmlFor={name}>{label ? `${label}` : ""}</label>{" "}
            <input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
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
    onChange: PropTypes.func
}

export default InputField
