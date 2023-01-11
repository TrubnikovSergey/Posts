import React from "react"
import PropTypes from "prop-types"

const RadioField = ({ items, name, onChange, value, elementInLine }) => {
    const handleChange = ({ target }) => {
        onChange({ target: { name: target.name, value: target.value } })
    }

    return (
        <div className={elementInLine ? "d-flex" : ""}>
            {items.map((e, i) => {
                return (
                    <div key={e + i} className="m-1">
                        <label htmlFor={e + i} className="m-1">
                            {e}
                        </label>
                        <input
                            type="radio"
                            id={e + i}
                            checked={e === value}
                            name={name}
                            value={e}
                            onChange={handleChange}
                        ></input>
                    </div>
                )
            })}
        </div>
    )
}

RadioField.propTypes = {
    items: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    elementInLine: PropTypes.bool,
    value: PropTypes.string
}

export default RadioField
