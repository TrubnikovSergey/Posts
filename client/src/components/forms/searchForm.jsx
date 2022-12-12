import React, { useState } from "react"
import PropTypes from "prop-types"
import InputField from "../formField/inputField"

const SearchForm = ({ onClickSearch, onClickSort }) => {
    const [searchValue, setSearchValue] = useState("")

    const handleChangeInput = ({ target }) => {
        setSearchValue(target.value)
    }

    const handleClickSort = ({ target }) => {
        target.classList.toggle("bi-sort-down-alt")
        target.classList.toggle("bi-sort-down")

        onClickSort(target)
    }

    const handleClickSearch = () => {
        onClickSearch(searchValue)
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
                        onClick={handleClickSort}
                        className="btn btn-primary bi bi-sort-down-alt"
                    ></button>
                </div>
            </div>
        </>
    )
}

SearchForm.propTypes = {
    onChangeInput: PropTypes.func,
    onClickSearch: PropTypes.func,
    onClickSort: PropTypes.func
}

export default SearchForm
