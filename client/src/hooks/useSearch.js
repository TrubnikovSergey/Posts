import { useState } from "react"

const useSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [sortType, setSortType] = useState("asc")
    const [registr, setRegistr] = useState(false)

    // const newPostList = sortPosts(sortType, userPosts)

    // function filterPosts(posts, valueSearch) {
    //     let foundPosts = posts
    //     if (valueSearch) {
    //         const flagI = registr ? "" : "i"

    //         foundPosts = posts.filter((post) => {
    //             const searchRegExp = new RegExp(`${valueSearch}`, flagI)
    //             const isFoundeInTitle = post.title.search(searchRegExp) !== -1
    //             const isFoundeInBody = post.body.search(searchRegExp) !== -1

    //             return isFoundeInTitle || isFoundeInBody
    //         })
    //     }

    //     return foundPosts
    // }

    const handleClickRegistr = () => {
        setRegistr((prev) => !prev)
    }

    const handleClickSearch = (value) => {
        setSearchValue(value)
    }

    // function sortPosts(type, posts) {
    //     const directionSort = type === "asc"
    //     const compare = (a, b) => {
    //         if (a.title > b.title) {
    //             return directionSort ? 1 : -1
    //         }
    //         if (a.title <= b.title) {
    //             return directionSort ? -1 : 1
    //         }

    //         return 0
    //     }

    //     return [...posts].sort(compare)
    // }

    const handleClickSort = (target) => {
        if (target.classList.contains("bi-sort-down-alt")) {
            setSortType("asc")
        } else {
            setSortType("desc")
        }
    }

    return {
        sortType,
        registr,
        handleClickSort,
        handleClickSearch,
        handleClickRegistr
    }
}

export default useSearch
