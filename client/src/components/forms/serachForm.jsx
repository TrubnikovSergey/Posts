import React, { useState, useEffect } from "react"
import InputField from "../formField/inputField"
import PropTypes from "prop-types"

const SearchForm = ({ posts, onFound, onSort }) => {
    const [searchValue, setSearchValue] = useState("")
    const [foundePosts, setFoundePosts] = useState(posts)

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

        const sortedPosts = [...foundePosts].sort(compare)

        setFoundePosts(sortedPosts)
        onSort(sortedPosts)
    }

    const handleClickSearch = () => {
        if (searchValue) {
            const filteredPosts = posts.filter((post) => {
                const searchRegExp = new RegExp(`${searchValue}`)
                const isFoundeInTitle = post.title.search(searchRegExp) !== -1
                const isFoundeInBody = post.body.search(searchRegExp) !== -1

                return isFoundeInTitle || isFoundeInBody
            })

            setFoundePosts(filteredPosts)
            onFound(filteredPosts)
        } else {
            setFoundePosts(posts)
            onFound(posts)
        }
    }

    return (
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
}

SearchForm.propTypes = {
    posts: PropTypes.array,
    onFound: PropTypes.func,
    onSort: PropTypes.func
}

export default SearchForm
