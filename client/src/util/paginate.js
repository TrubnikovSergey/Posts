export default function paginate(items, currentPage, pageSize = null) {
    if (pageSize) {
        const endIndex = pageSize * currentPage
        return items.slice(endIndex - pageSize, endIndex)
    }

    return items
}
