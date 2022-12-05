import httpService from "./http.service"
import config from "../config"

const url = config.backendEndPoint + "users/"

const userService = {
    login: async (email, pass) => {
        const { data } = await httpService.get(url)
        return data.find((item) => {
            return item.email === email
        })
    },
    create: async (user) => {
        const { data } = await httpService.post(url, user)

        return data
    }
}

export default userService
