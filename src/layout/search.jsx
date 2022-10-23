import React, { useState } from "react"
import InputField from "../components/formField/inputField"
import PostsList from "../components/postsList"

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [foundePosts, setFoundePosts] = useState()

    const handleSearch = ({ target }) => {
        setSearchValue(target.value)
    }

    const handleClickSearch = () => {
        if (searchValue) {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then((respons) => respons.json())
                .then((data) => {
                    const foundePostsList = data.filter((post) => {
                        const searchRegExp = new RegExp(`${searchValue}`)
                        const isFoundeInTitle =
                            post.title.search(searchRegExp) !== -1
                        const isFoundeInBody =
                            post.body.search(searchRegExp) !== -1

                        return isFoundeInTitle || isFoundeInBody
                    })

                    setFoundePosts(foundePostsList)
                })
        }
    }

    let renderPostsList = null
    if (foundePosts) {
        renderPostsList = <PostsList items={foundePosts} endPoint="/" />
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-11 shadow-lg p-3 mb-5 bg-body rounded">
                    <div className="input-group mb-3 justify-content-center">
                        <InputField
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearch}
                            value={searchValue}
                        />
                        <button
                            onClick={handleClickSearch}
                            className="btn btn-outline-primary"
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>
                {renderPostsList}
            </div>
        </div>
    )
}

export default Search
