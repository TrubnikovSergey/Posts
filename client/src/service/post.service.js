import httpService from "../service/http.service"
import config from "../config"

const url = config.backendEndPoint + "posts"

const postService = {
    fetchAll: async () => {
        const content = await httpService.get(url)
        const { data } = content

        return data
    },
    async create(post, accessToken, refreshToken) {
        const { data } = await httpService.post(`${url}/new`, post, {
            headers: { authorization: `Bearer ${accessToken} ${refreshToken}` }
        })
        return data
    },
    async update(post, accessToken, refreshToken) {
        const { data } = await httpService.patch(`${url}/${post._id}`, post, {
            headers: { authorization: `Bearer ${accessToken} ${refreshToken}` }
        })
        return data
    },

    async delete(postId, accessToken, refreshToken) {
        const { data } = await httpService.delete(`${url}/${postId}`, {
            headers: { authorization: `Bearer ${accessToken} ${refreshToken}` }
        })
        return data
    }
}

export default postService
