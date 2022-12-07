import httpService from "../service/http.service"
import config from "../config"

const url = config.backendEndPoint + "posts"

const postService = {
    fetchAll: async () => {
        const { data } = await httpService.get(url)
        return data
    },
    async create(post) {
        const { data } = await httpService.post(`${url}/new`, post)
        return data
    },
    async update(post) {
        const { data } = await httpService.patch(`${url}/${post._id}`, post)
        return data
    }
}

export default postService
