import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./postsSlice"
import authUserRaducer from "./authUserSlice"

export default configureStore({
    reducer: {
        posts: postReducer,
        authUser: authUserRaducer
    }
})
