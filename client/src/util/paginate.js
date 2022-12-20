import _ from "lodash"

export function paginate(items, currentPage, pageSize = null) {
    if (pageSize) {
        const endIndex = pageSize * currentPage
        return items.slice(endIndex - pageSize, endIndex)
    }

    return items
}

export function getArrayNumbers(count) {
    return _.range(1, count)
}

export default { paginate, getArrayNumbers }
