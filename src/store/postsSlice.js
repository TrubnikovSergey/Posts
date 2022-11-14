import { createSlice, createAction } from "@reduxjs/toolkit"
import postService from "../service/post.service"

const postSlice = createSlice({
    name: "posts",
    initialState: {
        entities: [],
        isLoading: false,
        error: null
    },
    reducers: {
        receivePosts(state, action) {
            state.entities = action.payload
        },
        receivePostsFailed(state, action) {
            state.error = action.payload
            state.isLoading = true
        }
    }
})

const { reducer: postReducer, actions } = postSlice
const { receivePosts, receivePostsFailed } = actions

const requestLoadPosts = createAction("posts/loadPosts")

export const postsFetchAll = () => async (dispatch) => {
    dispatch(requestLoadPosts())
    try {
        const content = await postService.fetchAll()
        dispatch(receivePosts(content))
    } catch (error) {
        dispatch(receivePostsFailed(error.message))
    }
}

export const getPostById = (id) => (state) => {
    return state.posts.entities.find((item) => String(item.id) === String(id))
}

export default postReducer
