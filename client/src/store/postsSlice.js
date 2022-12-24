import { createSlice } from "@reduxjs/toolkit"
import localStorageService from "../service/localStorage.service"
import postService from "../service/post.service"

const postSlice = createSlice({
    name: "posts",
    initialState: {
        entities: [],
        sizeListPaginate: 2,
        sizePage: 9,
        isLoading: false,
        toggle: false,
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
        },
        requestDeletePost(state, action) {
            state.isLoading = true
        },
        receiveDeletePost(state, action) {
            state.toggle = !state.toggle
            // const indexItem = state.entities.findIndex(
            //     (item) => item._id === action.payload
            // )

            // if (indexItem !== -1) {
            //     state.entities.splice(indexItem, 1)
            // }

            // state.isLoading = false
        },
        requestDeletePostFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        requestUpdatePostFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        requestPostsFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        },
        requestPostsPaginate(state, action) {
            state.isLoading = true
        },
        receivePostsPaginate(state, action) {
            state.entities = action.payload.postsList
            state.totalCount = action.payload.totalCount
            state.isLoading = false
        },
        requestPostsPaginateFailed(state, action) {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: postReducer, actions } = postSlice
const {
    requestPosts,
    receivePosts,
    requestPostsFailed,
    requestPostsPaginate,
    receivePostsPaginate,
    requestPostsPaginateFailed,
    receiveCreatePost,
    requestCreatePost,
    requestCreatePostFailed,
    requestUpdatePost,
    receiveUpdatePost,
    requestUpdatePostFailed,
    requestDeletePost,
    receiveDeletePost,
    requestDeletePostFailed
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

export const postsFetchPaginate = (reqBody) => async (dispatch) => {
    dispatch(requestPostsPaginate())
    try {
        const content = await postService.fetchPaginate(reqBody)
        dispatch(receivePostsPaginate(content))
    } catch (error) {
        dispatch(requestPostsPaginateFailed(error.message))
    }
}

export const updatePost = (post) => async (dispatch) => {
    dispatch(requestUpdatePost())
    try {
        const authUser = localStorageService.getAuthUser()
        const data = await postService.update(
            post,
            authUser.accessToken,
            authUser.refreshToken
        )
        dispatch(receiveUpdatePost(data))
    } catch (error) {
        dispatch(requestUpdatePostFailed(error.message))
    }
}

export const removePost = (_id) => async (dispatch) => {
    dispatch(requestDeletePost())
    try {
        const authUser = localStorageService.getAuthUser()
        await postService.delete(
            _id,
            authUser.accessToken,
            authUser.refreshToken
        )
        dispatch(receiveDeletePost(_id))
    } catch (error) {
        dispatch(requestDeletePostFailed(error.message))
    }
}

export const createPost = (post) => async (dispatch) => {
    dispatch(requestCreatePost())
    try {
        const authUser = localStorageService.getAuthUser()
        const data = await postService.create(
            post,
            authUser.accessToken,
            authUser.refreshToken
        )
        dispatch(receiveCreatePost(data))
    } catch (error) {
        dispatch(requestCreatePostFailed(error.message))
    }
}

export const getPaginate = () => (state) => {
    return {
        sizePage: state.posts.sizePage,
        sizeListPaginate: state.posts.sizeListPaginate
    }
}

export const getPostsList = () => (state) => {
    return state.posts.entities
}

export const getPostsListToggle = () => (state) => {
    return state.posts.toggle
}

export const getUserPostsList = (userId) => (state) => {
    return state.posts.entities.filter((item) => item.userId === userId)
}

export const getPostById = (id) => (state) => {
    const foundPost = state.posts.entities.find(
        (item) => String(item._id) === String(id)
    )
    return foundPost
}

export default postReducer
