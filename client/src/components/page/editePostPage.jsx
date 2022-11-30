import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../store/postsSlice"
import InputField from "../formField/inputField"
import TextAreaField from "../formField/textAreaField"

const EditPostPage = () => {
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }))
    }
    const { postId } = useParams()
    const post = useSelector(getPostById(postId))
    const [data, setData] = post
        ? useState({ title: post.title, body: post.body })
        : useState({ title: "", body: "" })
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }

    const saveHandle = () => {}

    let render = null
    if (data) {
        render = (
            <>
                <div>
                    <button className="btn btn-primary mb-3" onClick={goBack}>
                        Back
                    </button>
                </div>
                <InputField
                    label="title"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                ></InputField>
                <TextAreaField
                    label="Post"
                    name="body"
                    value={data.body}
                    onChange={handleChange}
                />
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary" onClick={saveHandle}>
                        Save
                    </button>
                </div>
            </>
        )
    } else {
        render = <h1>Post not found</h1>
    }

    return render
}

export default EditPostPage
