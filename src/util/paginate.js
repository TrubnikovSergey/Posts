export default function paginate(items, pageSize, currentPage) {
    const endIndex = pageSize * currentPage
    return items.slice(endIndex - pageSize, endIndex)
}
