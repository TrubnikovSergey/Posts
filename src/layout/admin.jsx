import React from "react"
import { useParams } from "react-router-dom"

const AdminPage = () => {
    const { postId } = useParams()
    console.log(postId)

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
                    <h1>admin {postId}</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminPage
