import { useState } from "react"

const useSearchSort = (userPosts) => {
    const [searchValue, setSearchValue] = useState("")
    const [sortType, setSortType] = useState("asc")

    const newPostList = sortPosts(sortType, filterPosts(userPosts, searchValue))

    function filterPosts(posts, valueSearch) {
        let foundPosts = posts
        if (valueSearch) {
            foundPosts = posts.filter((post) => {
                const searchRegExp = new RegExp(`${valueSearch}`)
                const isFoundeInTitle = post.title.search(searchRegExp) !== -1
                const isFoundeInBody = post.body.search(searchRegExp) !== -1

                return isFoundeInTitle || isFoundeInBody
            })
        }

        return foundPosts
    }

    const handleClickSearch = (value) => {
        setSearchValue(value)
    }

    function sortPosts(type, posts) {
        const directionSort = type === "asc"
        const compare = (a, b) => {
            if (a.title > b.title) {
                return directionSort ? 1 : -1
            }
            if (a.title <= b.title) {
                return directionSort ? -1 : 1
            }

            return 0
        }

        return [...posts].sort(compare)
    }

    const handleClickSort = (target) => {
        if (target.classList.contains("bi-sort-down-alt")) {
            setSortType("asc")
        } else {
            setSortType("desc")
        }
    }

    return { newPostList, handleClickSort, handleClickSearch }
}

export default useSearchSort
