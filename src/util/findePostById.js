const getPostById = (id, posts) => {
    const findePosts = posts.find((item) => String(item.id) === String(id))
    return findePosts === -1 ? null : findePosts
}

export default getPostById
