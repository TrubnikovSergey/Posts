import React, { useState } from "react"
import InputField from "../formField/inputField"
import PostsList from "../postsList"
import PropTypes from "prop-types"

const SearchForm = ({ posts, endPoint }) => {
    const [searchValue, setSearchValue] = useState("")
    const [foundePosts, setFoundePosts] = useState(posts)

    const handleSearch = ({ target }) => {
        setSearchValue(target.value)
    }
    const handleSort = ({ target }) => {
        target.classList.toggle("bi-sort-down-alt")
        target.classList.toggle("bi-sort-down")
    }

    const handleClickSearch = () => {
        if (searchValue) {
            const foundePostsList = posts.filter((post) => {
                const searchRegExp = new RegExp(`${searchValue}`)
                const isFoundeInTitle = post.title.search(searchRegExp) !== -1
                const isFoundeInBody = post.body.search(searchRegExp) !== -1

                return isFoundeInTitle || isFoundeInBody
            })

            setFoundePosts(foundePostsList)
        }
    }

    let renderPostsList = null
    if (foundePosts) {
        renderPostsList = (
            <>
                <h1>Found posts</h1>
                <PostsList items={foundePosts} endPoint={endPoint} />
            </>
        )
    }

    return (
        <>
            <div className="d-flex justify-content-center mb-3">
                <InputField
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    type="text"
                    placeholder="Search..."
                    onChange={handleSearch}
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
            {/* {renderPostsList} */}
        </>
    )
}

SearchForm.propTypes = {
    posts: PropTypes.array,
    endPoint: PropTypes.string
}

export default SearchForm
