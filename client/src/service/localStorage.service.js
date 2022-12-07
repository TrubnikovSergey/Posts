const AUTH_USER = "authUser"

const setAuthUser = (user) => {
    localStorage.setItem(AUTH_USER, JSON.stringify(user))
}

const deleteAuthUser = () => {
    localStorage.removeItem(AUTH_USER)
}

const getAuthUser = () => {
    const isAuthUser = localStorage.getItem(AUTH_USER)

    return isAuthUser ? JSON.parse(localStorage.getItem(AUTH_USER)) : null
}

export default {
    setAuthUser,
    deleteAuthUser,
    getAuthUser
}
