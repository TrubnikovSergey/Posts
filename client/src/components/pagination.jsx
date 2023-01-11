import React from "react"
import PropTypes from "prop-types"

const Pagination = ({ listPage, onSelectPage, currentPage }) => {
    const classLiItem = "page-item"

    const handleChangePage = ({ target }) => {
        let page = null
        switch (target.text) {
            case "«":
                page = -2
                break
            case "»":
                page = -1
                break

            default:
                page = Number(target.text)
                break
        }
        onSelectPage(page)
    }

    return (
        listPage.length > 0 && (
            <ul className="pagination pagination-sm justify-content-center">
                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        onClick={handleChangePage}
                    >
                        &laquo;
                    </a>
                </li>
                {listPage.map((page) => (
                    <li
                        key={page}
                        className={
                            currentPage === page
                                ? classLiItem + " active"
                                : classLiItem
                        }
                    >
                        <a
                            className="page-link"
                            href="#"
                            onClick={handleChangePage}
                        >
                            {page}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        onClick={handleChangePage}
                    >
                        &raquo;
                    </a>
                </li>
            </ul>
        )
    )
}

Pagination.propTypes = {
    listPage: PropTypes.array,
    onSelectPage: PropTypes.func,
    currentPage: PropTypes.number
}

export default Pagination
