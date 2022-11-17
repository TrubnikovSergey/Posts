import { createSlice } from "@reduxjs/toolkit"
import userService from "../service/user.service"

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        entities: null,
        isLoading: false,
        error: null
    },
    reducers: {
        requestUser(state, action) {
            state.isLoading = true
        },
        requestUserFailed(state, action) {
            state.entities = null
            state.isLoading = false
            state.error = action.payload
        },
        receiveUser(state, action) {
            state.entities = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: authUserRaducer, actions } = authUserSlice
const { receiveUser, requestUser, requestUserFailed } = actions

export const getAuthUser = () => (state) => {
    return state.entities
}

export const getError = () => (state) => {
    return state.error
}

export const signIn = (email, pass) => async (dispatch) => {
    dispatch(requestUser())
    try {
        const data = await userService.signIn(email)
        dispatch(receiveUser(data))
    } catch (error) {
        dispatch(requestUserFailed(error.message))
    }
}

export default authUserRaducer
