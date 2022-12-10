import React from "react"
import PropTypes from "prop-types"

const TextAreaField = ({ label, name, type, placeholder, value, onChange }) => {
    return (
        <>
            <div className="mt-3">
                <label htmlFor={name}>{label ? `${label}` : ""}</label>
                <br />
                <textarea
                    className="form-control"
                    rows="15"
                    name={name}
                    id="textareaForCKEDITOR"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

/*
                <label htmlFor={name}>{label ? `${label}` : ""}</label>
                <br />
                <textarea
                    className="form-control"
                    rows="15"
                    name={name}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
*/

TextAreaField.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.object,
    onChange: PropTypes.func
}

export default TextAreaField
