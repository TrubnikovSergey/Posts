import httpService from "./http.service"

const url = "https://jsonplaceholder.typicode.com/users"

const userService = {
    signIn: async (email, pass) => {
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
