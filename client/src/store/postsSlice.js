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
            // state.isLoading = true
            return { ...state, isLoading: true }
        },
        receivePosts(state, action) {
            // state.entities = action.payload
            // state.isLoading = false
            return { ...state, entities: action.payload, isLoading: false }
        },
        requestPostsFailed(state, action) {
            // state.error = action.payload
            // state.isLoading = false
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
    return state.posts.entities.find((item) => String(item.id) === String(id))
}

export default postReducer
