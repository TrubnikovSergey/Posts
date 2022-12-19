import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import localStorageService from "../../service/localStorage.service"
import { createPost, getPostById, updatePost } from "../../store/postsSlice"
import InputField from "../formField/inputField"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw, ContentState } from "draft-js"
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html"
import htmlToDraft from "html-to-draftjs"

const EditPostPage = () => {
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }))
    }
    const { postId } = useParams()
    const post = useSelector(getPostById(postId))
    const [data, setData] = post
        ? useState({ title: post.title, body: post.body })
        : useState({ title: "", body: "" })

    let initEditor = EditorState.createEmpty()

    useEffect(() => {
        if (data.body) {
            const contentBlock = htmlToDraft(data.body)
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            )
            initEditor = EditorState.createWithContent(contentState)

            setEditorState(initEditor)
        }
    }, [])

    const [editorState, setEditorState] = useState(initEditor)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userId } = localStorageService.getAuthUser()

    const goBack = () => {
        navigate("/admin")
    }

    const handleEditorChange = (editorState) => {
        setEditorState(editorState)
        setData({
            title: data.title,
            body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    }

    const saveHandle = () => {
        if (postId) {
            dispatch(updatePost({ ...data, _id: postId, userId }))
        } else {
            dispatch(createPost({ ...data, userId }))
        }

        navigate("/admin")
    }

    let render = null
    if (data) {
        render = (
            <>
                <div>
                    <button
                        className="btn btn-primary mb-2 mt-2"
                        onClick={goBack}
                    >
                        {postId ? "Back" : "Cancel"}
                    </button>
                </div>
                <h3 className="mt-4">Title</h3>
                <InputField
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                ></InputField>
                <div>
                    <h3 className="mt-4">Post</h3>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                    />
                    {/* <TextAreaField
                    label="Post"
                    name="body"
                    value={data.body}
                    onChange={handleChange}
                /> */}
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <button className="btn btn-primary" onClick={saveHandle}>
                        {postId ? "Save" : "Create"}
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
