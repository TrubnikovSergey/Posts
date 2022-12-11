import { useState } from "react"

const useSearch = (Init) => {
    const [foundPost, setFoundPost] = useState(Init)

    const handleFound = (items) => {
        setFoundPost(items)
    }
    const handleSort = (items) => {
        setFoundPost(items)
    }

    return { foundPost, handleFound, handleSort }
}

export default useSearch
