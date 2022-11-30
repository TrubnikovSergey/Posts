import { createSlice } from "@reduxjs/toolkit"
import {
    deleteAuthUserLocalStorage,
    setAuthUserLocalStorage
} from "../service/localStorage.service"
import userService from "../service/user.service"

const authUserSlice = createSlice({
    name: "authUser",
    initialState: {
        entities: null,
        isLoading: false,
        isAuth: false,
        error: null
    },
    reducers: {
        requestSignOut(state) {
            state.isLoading = false
            state.entities = null
            state.isAuth = false
            state.error = null
        },
        requestSignUp(state) {
            state.isLoading = true
        },
        requestUserSignIn(state) {
            state.isLoading = true
        },
        requestUserFailed(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        receiveUser(state, action) {
            state.entities = action.payload
            state.isLoading = false
            state.error = null
            state.isAuth = true
        }
    }
})

const { reducer: authUserRaducer, actions } = authUserSlice
const {
    requestSignOut,
    receiveUser,
    requestUserSignIn,
    requestUserFailed,
    requestSignUp
} = actions

export const getAuthUser = () => (state) => {
    return state.authUser.entities
}

export const getIsAuth = () => (state) => {
    return state.authUser.isAuth
}

export const getIsAuthLoading = () => (state) => {
    return state.authUser.isLoading
}

export const getAuthError = () => (state) => {
    return state.authUser.error
}

export const signUp = (user) => async (dispatch) => {
    dispatch(requestSignUp())
    try {
        const data = await userService.create(user)
        dispatch(receiveUser(data))
        setAuthUserLocalStorage(data)
    } catch (error) {
        dispatch(requestUserFailed(error.message))
    }
}

export const signIn = (email, pass) => async (dispatch) => {
    dispatch(requestUserSignIn())
    try {
        const data = await userService.login(email)
        if (data) {
            setAuthUserLocalStorage(data)
            dispatch(receiveUser(data))
        } else {
            dispatch(requestUserFailed("User not found"))
        }
    } catch (error) {
        dispatch(requestUserFailed(error.message))
    }
}

export const signOut = () => (dispatch) => {
    deleteAuthUserLocalStorage()
    dispatch(requestSignOut())
}

export default authUserRaducer
