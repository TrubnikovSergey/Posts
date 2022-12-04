import httpService from "../service/http.service"

const url = "https://jsonplaceholder.typicode.com/posts"

const postService = {
    fetchAll: async () => {
        const { data } = await httpService.get(url)
        return data
    }
}

export default postService
