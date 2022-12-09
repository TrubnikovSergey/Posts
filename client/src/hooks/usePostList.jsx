import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removePost } from "../store/postsSlice"
import { getTypePostsList } from "../store/viewPostsListSlice"

const usePostList = () => {
    const dispatch = useDispatch()
    const typeList = useSelector(getTypePostsList())
    const navigate = useNavigate()

    const handleDelete = (postId) => {
        dispatch(removePost(postId))
    }
    const handleEdit = (path) => {
        navigate(path)
    }

    return { handleDelete, typeList, handleEdit }
}

export default usePostList
