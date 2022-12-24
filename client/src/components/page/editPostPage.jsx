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
import Loader from "../loader"
import postService from "../../service/post.service"
import { toast } from "react-toastify"

const EditPostPage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState()

    // const post = useSelector(getPostById(postId))
    const [data, setData] = useState({ title: "", body: "" })

    let initEditor = EditorState.createEmpty()
    const [editorState, setEditorState] = useState(initEditor)

    useEffect(() => {
        if (postId) {
            postService.getPostById(postId).then((resp) => {
                setPost(resp)
                setData({ title: resp.title, body: resp.body })

                if (resp.body) {
                    const contentBlock = htmlToDraft(resp.body)
                    const contentState = ContentState.createFromBlockArray(
                        contentBlock.contentBlocks
                    )
                    initEditor = EditorState.createWithContent(contentState)

                    setEditorState(initEditor)
                }
            })
        }
    }, [])

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const { userId } = localStorageService.getAuthUser()

    const goBack = () => {
        navigate("/admin")
    }
    const handleChange = ({ target }) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }))
    }

    const handleEditorChange = (editorState) => {
        setEditorState(editorState)
        setData({
            title: data.title,
            body: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        })
    }

    const saveHandle = async () => {
        if (data.title && data.body) {
            if (postId) {
                // dispatch(updatePost({ ...data, _id: postId, userId }))
                const post = { ...data, _id: postId, userId }
                const authUser = localStorageService.getAuthUser()
                await postService.update(
                    post,
                    authUser.accessToken,
                    authUser.refreshToken
                )
            } else {
                // dispatch(createPost({ ...data, userId }))
                const post = { ...data, userId }
                const authUser = localStorageService.getAuthUser()
                await postService.create(
                    post,
                    authUser.accessToken,
                    authUser.refreshToken
                )
            }

            navigate("/admin")
        } else {
            toast.error("Post title and body must be filled")
        }
    }

    let render = (
        <>
            <div>
                <button className="btn btn-primary mb-2 mt-2" onClick={goBack}>
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
            </div>
            <div className="d-flex justify-content-end mt-2">
                <button className="btn btn-primary" onClick={saveHandle}>
                    {postId ? "Save" : "Create"}
                </button>
            </div>
        </>
    )
    if (postId && !post) {
        render = <Loader />
    }

    return render
}

export default EditPostPage
