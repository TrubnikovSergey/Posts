import { configureStore } from "@reduxjs/toolkit"
import postReducer from "./postsSlice"

export default configureStore({
    reducer: {
        posts: postReducer
    }
})
