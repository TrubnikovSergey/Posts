import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./postsSlice"
import authUserRaducer from "./authUserSlice"
import viewPostsListReducer from "./viewPostsListSlice"

export default configureStore({
    reducer: {
        posts: postReducer,
        authUser: authUserRaducer,
        viewPostsList: viewPostsListReducer
    }
})
