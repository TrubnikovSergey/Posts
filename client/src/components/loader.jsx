import React from "react"

const Loader = () => {
    return (
        <div className="container">
            <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
            ></span>
            &nbsp;&nbsp;<em>loading...</em>
        </div>
    )
}

export default Loader
