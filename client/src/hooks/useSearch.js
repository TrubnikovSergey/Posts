import React, { useState } from "react"
import InputField from "../components/formField/inputField"

const useSearch = (posts) => {
    const [searchValue, setSearchValue] = useState("")
    const [foundPosts, setFoundPosts] = useState(posts)

    const handleChangeInput = ({ target }) => {
        setSearchValue(target.value)
    }

    const handleSort = ({ target }) => {
        target.classList.toggle("bi-sort-down-alt")
        target.classList.toggle("bi-sort-down")

        const directionSort = target.classList.contains("bi-sort-down-alt")

        const compare = (a, b) => {
            if (a.title > b.title) {
                return directionSort ? 1 : -1
            }
            if (a.title < b.title) {
                return directionSort ? -1 : 1
            }

            return 0
        }

        const sortedPosts = [...foundPosts].sort(compare)

        setFoundPosts(sortedPosts)
    }

    const handleClickSearch = () => {
        if (searchValue) {
            const filteredPosts = posts.filter((post) => {
                const searchRegExp = new RegExp(`${searchValue}`)
                const isFoundeInTitle = post.title.search(searchRegExp) !== -1
                const isFoundeInBody = post.body.search(searchRegExp) !== -1

                return isFoundeInTitle || isFoundeInBody
            })

            setFoundPosts(filteredPosts)
        } else {
            setFoundPosts(posts)
        }
    }

    const searchComponent = (
        <>
            <div className="d-flex justify-content-center mb-3">
                <InputField
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    type="text"
                    placeholder="Search..."
                    onChange={handleChangeInput}
                    value={searchValue}
                />
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        onClick={handleClickSearch}
                        className="btn btn-primary bi bi-search me-1"
                    ></button>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        onClick={handleSort}
                        className="btn btn-primary bi bi-sort-down-alt"
                    ></button>
                </div>
            </div>
        </>
    )

    return { searchComponent, searchValue, foundPosts }
}

export default useSearch

// import { useState } from "react"

// const useSearch = (Init) => {
//     const [foundPost, setFoundPost] = useState(Init)

//     const handleFound = (items) => {
//         setFoundPost(items)
//     }
//     const handleSort = (items) => {
//         setFoundPost(items)
//     }

//     return { foundPost, handleFound, handleSort }
// }

// export default useSearch
