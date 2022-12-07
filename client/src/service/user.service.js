import httpService from "./http.service"
import config from "../config"

const url = config.backendEndPoint + "auth/"

const userService = {
    login: async (email, password) => {
        try {
            const { data } = await httpService.post(url + "signIn", {
                email,
                password
            })
            return data
        } catch (error) {
            throw new Error(error.response.data.error.message)
        }
    },
    loginWithToken: async (user) => {
        try {
            const { data } = await httpService.post(
                url + "signInWithToken",
                user
            )

            return data
        } catch (error) {
            throw new Error(error.response.data.error.message)
        }
    },
    create: async (user) => {
        try {
            const { data } = await httpService.post(url + "signUp", user)

            return data
        } catch (error) {
            throw new Error(error.response.data.error.message)
        }
    }
}

export default userService
