import _ from "lodash"

export function paginate(items, currentPage, pageSize = null) {
    if (pageSize) {
        const endIndex = pageSize * currentPage
        return items.slice(endIndex - pageSize, endIndex)
    }

    return items
}

export const calculateListPage = (
    numberFirstPagePaginate,
    sizePage,
    totalCountDataElements,
    sizeListPaginate
) => {
    const paginateCountPosts = (numberFirstPagePaginate - 1) * sizePage
    const differencePosts = totalCountDataElements - paginateCountPosts

    const isCountPostsSufficeForListPaginate =
        Math.ceil(differencePosts / sizePage) >= sizeListPaginate

    let arrayNumber = []

    if (isCountPostsSufficeForListPaginate) {
        arrayNumber = getArrayNumbers(
            numberFirstPagePaginate + sizeListPaginate
        )
    } else {
        const sizeListPaginateDiff = Math.ceil(differencePosts / sizePage)

        arrayNumber = getArrayNumbers(
            numberFirstPagePaginate + sizeListPaginateDiff
        )
    }

    return arrayNumber.slice(numberFirstPagePaginate - 1)
}

export function getArrayNumbers(count) {
    return _.range(1, count)
}

export default { paginate, getArrayNumbers, calculateListPage }
