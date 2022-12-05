import httpService from "../service/http.service"
import config from "../config"

const url = config.backendEndPoint + "posts/"

const postService = {
    fetchAll: async () => {
        const { data } = await httpService.get(url)
        return data
    }
}

export default postService
