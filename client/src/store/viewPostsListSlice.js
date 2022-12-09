import { createSlice } from "@reduxjs/toolkit"

const viewSlice = createSlice({
    name: "viewPostsList",
    initialState: {
        type: "list"
    },
    reducers: {
        toggleType(state, action) {
            state.type = state.type === "list" ? "tile" : "list"
        }
    }
})

const { reducer: viewPostsListReducer, actions } = viewSlice
const { toggleType } = actions

export const getTypePostsList = () => (state) => {
    return state.viewPostsList.type
}

export const toggleViewPostsList = () => (dispatch) => {
    dispatch(toggleType())
}

export default viewPostsListReducer
