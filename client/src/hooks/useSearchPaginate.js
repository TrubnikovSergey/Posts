import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import postService from "../service/post.service"
import { getPaginate, getPostsListToggle } from "../store/postsSlice"

const useSearchPaginate = (userId) => {
    const { sizePage, sizeListPaginate } = useSelector(getPaginate())
    const { postId } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsList, setPostsList] = useState([])
    const [post, setPost] = useState()
    const [firstPagePaginate, setFirstPagePaginate] = useState(1)
    const [totalCountPosts, setTotalCountPosts] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [toggle, setToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const postsListToggle = useSelector(getPostsListToggle())

    const [registr, setRegistr] = useState(false)
    const [sortType, setSortType] = useState("asc")

    const handleClickRegistr = () => {
        setRegistr((prev) => !prev)
    }
    const handleClickSearch = (value) => {
        setSearchValue(value)

        if (value) {
            setToggle((prev) => !prev)

            setCurrentPage(1)
            setFirstPagePaginate(1)
            setPostsList([])
        }
    }
    const handleClickSort = (target) => {
        if (target.classList.contains("bi-sort-down-alt")) {
            setSortType("asc")
        } else {
            setSortType("desc")
        }

        setCurrentPage(1)
        setFirstPagePaginate(1)
        setPostsList([])
    }

    useEffect(() => {
        if (postId) {
            postService.getPostById(postId).then((data) => {
                setPost(data)
            })

            if (postId !== post?._id) {
                setPost(null)
            }
        }
    }, [postId])

    useEffect(() => {
        if (searchValue) {
            setIsLoading(true)

            const idx = (currentPage - 1) * sizePage

            postService
                .fetchPaginateWithSearch({
                    searchValue,
                    sortType,
                    registr,
                    startIndex: idx,
                    count: sizePage,
                    userId
                })
                .then((data) => {
                    setPostsList(data.postsList)
                    setTotalCountPosts(data.totalCount)
                    setIsLoading(false)
                })
        } else {
            const idx = (currentPage - 1) * sizePage
            setIsLoading(true)

            postService
                .fetchPaginate({
                    startIndex: idx,
                    count: sizePage,
                    sortType,
                    userId
                })
                .then((data) => {
                    setPostsList(data.postsList)
                    setTotalCountPosts(data.totalCount)
                    setIsLoading(false)
                })
        }
    }, [currentPage, searchValue, sortType, toggle, postsListToggle])

    const handleSelectPage = (page) => {
        if (currentPage === page) {
            return
        }

        if (page > 0) {
            setCurrentPage(page)
            setPostsList([])
        } else {
            const isRightExistsPagePginate =
                (firstPagePaginate - 1 + sizeListPaginate) * sizePage <
                totalCountPosts
            const isLeftExistsPagePginate = firstPagePaginate > 1

            if (page === -1 && isRightExistsPagePginate) {
                setFirstPagePaginate(firstPagePaginate + sizeListPaginate)
                setCurrentPage(firstPagePaginate + sizeListPaginate)
            }
            if (page === -2 && isLeftExistsPagePginate) {
                setFirstPagePaginate(firstPagePaginate - sizeListPaginate)
                setCurrentPage(firstPagePaginate - sizeListPaginate)
            }
        }
    }

    return {
        sizePage,
        sizeListPaginate,
        postId,
        currentPage,
        postsList,
        post,
        firstPagePaginate,
        totalCountPosts,
        searchValue,
        toggle,
        isLoading,
        registr,
        sortType,
        handleSelectPage,
        handleClickSort,
        handleClickSearch,
        handleClickRegistr
    }
}

export default useSearchPaginate
