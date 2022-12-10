import React from "react"

const Loader = () => {
    return (
        <div className="d-flex align-items-center">
            <span
                className="spinner-border spinner-border-sm text-primary"
                role="status"
                aria-hidden="true"
            ></span>
            &nbsp;&nbsp;<em>loading...</em>
        </div>
    )
}

export default Loader
