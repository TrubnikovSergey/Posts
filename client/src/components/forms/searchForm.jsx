import React, { useState } from "react"
import PropTypes from "prop-types"
import InputField from "../formField/inputField"

const SearchForm = ({
    onClickSearch,
    onClickSort,
    onClickRegistr,
    registr
}) => {
    const [searchValue, setSearchValue] = useState("")

    const handleChangeInput = ({ target }) => {
        setSearchValue(target.value)
    }

    const handleClickSort = ({ target }) => {
        target.classList.toggle("bi-sort-down-alt")
        target.classList.toggle("bi-sort-down")

        onClickSort(target)
    }

    const handleClickRegistr = () => {
        onClickRegistr()
    }

    const handleClickSearch = () => {
        onClickSearch(searchValue)
    }

    return (
        <>
            <div className="d-flex justify-content-center mb-3">
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        onClick={handleClickRegistr}
                        className={
                            registr
                                ? "btn btn-primary"
                                : "btn btn-outline-primary"
                        }
                    >
                        <i className="bi bi-type"></i>
                    </button>
                </div>
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
    onClickSort: PropTypes.func,
    onClickRegistr: PropTypes.func,
    registr: PropTypes.bool
}

export default SearchForm
