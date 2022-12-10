import React from "react"
import PropTypes from "prop-types"
import usePostList from "../hooks/usePostList"
import { Link } from "react-router-dom"

const PostsList = ({
    items,
    endPoint = "/",
    view = "list",
    extended = false
}) => {
    const { handleDelete, typeList, handleEdit } = usePostList()

    const cutString = (str, count) => {
        const newStr = str.slice(0, count)

        if (str.length > count) {
            return newStr + " ..."
        }

        return newStr
    }

    let render = null

    if (view === "list" && !extended) {
        render = (
            <>
                {items.map((post) => (
                    <div key={post._id}>
                        <div className="d-flex align-items-end">
                            <div className="me-auto">
                                <Link to={endPoint + post._id}>
                                    {post.title}
                                </Link>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
            </>
        )
    } else {
        if (typeList === "list") {
            render = (
                <>
                    {items.map((post) => (
                        <div key={post._id}>
                            <div className="d-flex align-items-end align-items-center">
                                <div className="me-auto">
                                    <h3>{post.title}</h3>
                                </div>
                                {extended ? (
                                    <div className="d-flex">
                                        <button
                                            className="btn btn-success m-1"
                                            onClick={() =>
                                                handleEdit(endPoint + post._id)
                                            }
                                        >
                                            edit
                                        </button>
                                        <button
                                            className="btn btn-danger m-1"
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                        >
                                            delete
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                            <hr />
                        </div>
                    ))}
                </>
            )
        } else if (typeList === "tile") {
            render = (
                <>
                    <div className="d-flex flex-wrap justify-content-center">
                        {items.map((post) => (
                            <div
                                className="card container text-center m-3"
                                style={{ width: "250px", height: "250px" }}
                                key={post._id}
                            >
                                <div
                                    className="row "
                                    style={{ height: "250px" }}
                                >
                                    <div className="p-3">
                                        <h3 className="card-title">
                                            {cutString(post.title, 20)}
                                        </h3>
                                    </div>

                                    <div className="card-text">
                                        {cutString(post.body, 20)}
                                    </div>
                                    {extended ? (
                                        <div className="col align-self-end mb-3">
                                            <button
                                                className="btn btn-success me-5"
                                                onClick={() =>
                                                    handleEdit(
                                                        endPoint + post._id
                                                    )
                                                }
                                            >
                                                edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(post._id)
                                                }
                                            >
                                                delete
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )
        } else {
            render = <h1>Post list is undefinde</h1>
        }
    }

    return <>{render}</>
}

PostsList.propTypes = {
    items: PropTypes.array,
    endPoint: PropTypes.string,
    view: PropTypes.string,
    extended: PropTypes.bool
}

export default PostsList
