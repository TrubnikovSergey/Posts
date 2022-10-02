import React from "react"
import PropTypes from "prop-types"

const InputField = ({ type, placeholder, value, onChange, className }) => {
    return (
        <div>
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

InputField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default InputField
