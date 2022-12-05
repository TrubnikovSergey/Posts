import { createSlice } from "@reduxjs/toolkit"
import postService from "../service/post.service"

const postSlice = createSlice({
    name: "posts",
    initialState: {
        entities: [],
        isLoading: false,
        error: null
    },
    reducers: {
        requestPosts(state, action) {
            return { ...state, isLoading: true }
        },
        receivePosts(state, action) {
            return { ...state, entities: action.payload, isLoading: false }
        },
        requestPostsFailed(state, action) {
            return { ...state, error: action.payload, isLoading: false }
        }
    }
})

const { reducer: postReducer, actions } = postSlice
const { receivePosts, requestPosts, requestPostsFailed } = actions

export const postsFetchAll = () => async (dispatch) => {
    dispatch(requestPosts())
    try {
        const content = await postService.fetchAll()
        dispatch(receivePosts(content))
    } catch (error) {
        dispatch(requestPostsFailed(error.message))
    }
}

export const getPostsList = () => (state) => {
    return state.posts.entities
}

export const getUserPostsList = (userId) => (state) => {
    return state.posts.entities.filter((item) => item.userId === userId)
}

export const getPostById = (id) => (state) => {
    return state.posts.entities.find((item) => String(item._id) === String(id))
}

export default postReducer
