const AUTH_USER = "authUser"

export const setAuthUserLocalStorage = (user) => {
    localStorage.setItem(AUTH_USER, JSON.stringify(user))
}

export const deleteAuthUserLocalStorage = () => {
    localStorage.removeItem(AUTH_USER)
}

export const getAuthUserLocalStorage = () => {
    const isAuthUser = localStorage.getItem(AUTH_USER)

    return isAuthUser ? JSON.parse(localStorage.getItem(AUTH_USER)) : null
}
