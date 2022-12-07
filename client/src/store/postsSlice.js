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
            state.isLoading = true
        },
        receivePosts(state, action) {
            state.entities = action.payload
            state.isLoading = false
        },
        requestCreatePost(state, action) {
            state.isLoading = true
        },
        receiveCreatePost(state, action) {
            state.entities.push(action.payload)
            state.isLoading = false
        },
        requestCreatePostFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        requestUpdatePost(state, action) {
            state.isLoading = true
        },
        receiveUpdatePost(state, action) {
            state.entities.forEach((item) => {
                if (item._id === action.payload._id) {
                    item.title = action.payload.title
                    item.body = action.payload.body
                }
            })

            state.isLoading = false
        },
        requestUpdatePostFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        requestPostsFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: postReducer, actions } = postSlice
const {
    receivePosts,
    requestPosts,
    requestPostsFailed,
    requestCreatePostFailed,
    requestCreatePost,
    requestUpdatePostFailed,
    requestUpdatePost,
    receiveUpdatePost,
    receiveCreatePost
} = actions

export const postsFetchAll = () => async (dispatch) => {
    dispatch(requestPosts())
    try {
        const content = await postService.fetchAll()
        dispatch(receivePosts(content))
    } catch (error) {
        dispatch(requestPostsFailed(error.message))
    }
}

export const updatePost = (post) => async (dispatch) => {
    dispatch(requestUpdatePost())
    try {
        const data = await postService.update(post)
        dispatch(receiveUpdatePost(data))
    } catch (error) {
        dispatch(requestUpdatePostFailed(error.message))
    }
}
export const createPost = (post) => async (dispatch) => {
    dispatch(requestCreatePost())
    try {
        const data = await postService.create(post)
        dispatch(receiveCreatePost(data))
    } catch (error) {
        dispatch(requestCreatePostFailed(error.message))
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
