import React from "react"
import Post from "../post"
import PostsList from "../postsList"
import SearchForm from "../forms/searchForm"
import Pagination from "../pagination"
import utils from "../../util"
import useSearchPaginate from "../../hooks/useSearchPaginate"

const Home = () => {
    const {
        sizePage,
        sizeListPaginate,
        postId,
        currentPage,
        postsList,
        post,
        firstPagePaginate,
        totalCountPosts,
        isLoading,
        registr,
        handleSelectPage,
        handleClickSort,
        handleClickSearch,
        handleClickRegistr
    } = useSearchPaginate()

    const listPage = utils.paginate.calculateListPage(
        firstPagePaginate,
        sizePage,
        totalCountPosts,
        sizeListPaginate
    )

    return (
        <>
            <div className="col-4 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                <div>
                    <h1>Posts</h1>
                    <SearchForm
                        onClickSearch={handleClickSearch}
                        onClickSort={handleClickSort}
                        onClickRegistr={handleClickRegistr}
                        registr={registr}
                    />
                </div>
                <div
                    className="d-inline-block"
                    style={{ width: "100%", height: sizePage * 60 + "px" }}
                >
                    <PostsList items={postsList} isLoading={isLoading} />
                </div>
                <Pagination
                    listPage={listPage}
                    onSelectPage={handleSelectPage}
                    currentPage={currentPage}
                />
            </div>
            <div className="col-7 shadow-lg p-3 m-2 mb-5 bg-body rounded">
                {postId ? <Post post={post} /> : null}
            </div>
        </>
    )
}

export default Home
