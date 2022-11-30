import React, { useEffect, useState } from "react"
import _ from "lodash"
import PropTypes from "prop-types"

const Pagination = ({
    totalCountPages,
    paginationSize,
    handleChangePage,
    currentPage
}) => {
    const [pages, setPages] = useState()
    useEffect(() => {
        setPages(_.range(1, Math.min(totalCountPages, paginationSize) + 1))
    }, [])

    const classLiItem = "page-item"

    const handleClickLeft = () => {
        if (pages[0] > paginationSize) {
            const start = pages[0] - paginationSize
            const end = start + paginationSize

            setPages(_.range(start, end))
            handleChangePage(start)
        }
    }
    const handleClickRight = () => {
        if (pages[paginationSize - 1] < totalCountPages - 1) {
            const start = pages[0] + paginationSize
            const end = Math.min(start + paginationSize, totalCountPages)

            setPages(_.range(start, end))
            handleChangePage(start)
        }
    }

    return (
        pages && (
            <ul className="pagination pagination-sm justify-content-center">
                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        onClick={handleClickLeft}
                    >{`<<`}</a>
                </li>
                {pages.map((page) => (
                    <li
                        key={page}
                        onClick={() => handleChangePage(page)}
                        className={
                            currentPage === page
                                ? classLiItem + " active"
                                : classLiItem
                        }
                    >
                        <a className="page-link" href="#">
                            {page}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        onClick={handleClickRight}
                    >
                        {`>>`}
                    </a>
                </li>
            </ul>
        )
    )
}

Pagination.propTypes = {
    totalCountPages: PropTypes.number,
    paginationSize: PropTypes.number,
    currentPage: PropTypes.number,
    handleChangePage: PropTypes.func
}

export default Pagination
