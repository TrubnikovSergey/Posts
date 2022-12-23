import React from "react"
import PropTypes from "prop-types"

// const Pagination = ({
//     totalCountPages,
//     paginationSize,
//     handleChangePage,
//     currentPage
// }) => {
const Pagination = ({ listPage, onSelectPage, currentPage }) => {
    // const [pages, setPages] = useState()
    // useEffect(() => {
    //     setPages(
    //         utils.getArrayNumbers(Math.min(totalCountPages, paginationSize) + 1)
    //     )
    // }, [])

    const classLiItem = "page-item"

    // const handleClickLeft = () => {
    //     // if (pages[0] > paginationSize) {
    //     //     const start = pages[0] - paginationSize
    //     //     const end = start + paginationSize
    //     //     setPages(_.range(start, end))
    //     //     handleChangePage(start)
    //     // }
    // }
    // const handleClickRight = () => {
    //     // if (pages[paginationSize - 1] < totalCountPages - 1) {
    //     //     const start = pages[0] + paginationSize
    //     //     const end = Math.min(start + paginationSize, totalCountPages)
    //     //     setPages(_.range(start, end))
    //     //     handleChangePage(start)
    //     // }
    // }

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
