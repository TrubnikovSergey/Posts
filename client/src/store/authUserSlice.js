import { createSlice } from "@reduxjs/toolkit"
import localStorageService from "../service/localStorage.service"
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
        requestUserSignInWithToken(state) {
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
    requestSignUp,
    requestUserSignInWithToken
} = actions

export const getAuthUser = () => (state) => {
    return state.authUser.entities.user
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

export const signUp = (newUser) => async (dispatch) => {
    dispatch(requestSignUp())
    try {
        const data = await userService.create(newUser)
        const { tokens, user } = data

        dispatch(receiveUser({ ...tokens, user }))
        localStorageService.setAuthUser(tokens)
    } catch (error) {
        const message = error.message

        switch (message) {
            case "EMAIL_EXISTS":
                dispatch(requestUserFailed("User with this email exists"))
                break

            case "INVALID_DATA":
                dispatch(requestUserFailed("Entered data was not validated"))
                break

            default:
                dispatch(requestUserFailed("Error on server. Please try later"))
                break
        }
    }
}

export const signInWithToken = (user) => async (dispatch) => {
    dispatch(requestUserSignInWithToken())
    try {
        const data = await userService.loginWithToken(user)
        dispatch(receiveUser(data))
    } catch (error) {
        const message = error.message

        switch (message) {
            case "TOKENS_IS_NOT_VALID":
                dispatch(requestUserFailed("Tokens is not valid"))
                break

            default:
                dispatch(requestUserFailed("Error on server. Please try later"))
                break
        }
    }
}

export const signIn = (email, password) => async (dispatch) => {
    dispatch(requestUserSignIn())
    try {
        const data = await userService.login(email, password)
        const { tokens, user } = data

        localStorageService.setAuthUser(tokens)
        dispatch(receiveUser({ ...tokens, user }))
    } catch (error) {
        const message = error.message

        switch (message) {
            case "EMAIL_NOT_FOUND":
                dispatch(requestUserFailed("User with this email not found"))
                break
            case "INVALID_PASSWORD":
                dispatch(requestUserFailed("Incorrect password"))
                break
            case "INVALID_DATA":
                dispatch(requestUserFailed("Email or password incorrect"))
                break

            default:
                dispatch(requestUserFailed("Error on server. Please try later"))
                break
        }
    }
}

export const signOut = () => (dispatch) => {
    localStorageService.deleteAuthUser()
    dispatch(requestSignOut())
}

export default authUserRaducer
