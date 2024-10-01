import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

const PaginationContainer = () => {
  //importing meta from useLoaderdata
  const { meta } = useLoaderData()
  //extracting pageCount and page value from meta
  const { pageCount, page } = meta.pagination

  // creating and array of numbers base on available pageCount
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })

  const { search, pathname } = useLocation()
  const navigate = useNavigate()

  //A function to handle Page change
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set("page", pageNumber)

    navigate(`${pathname}?${searchParams.toString()}`)
  }
  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md"
          onClick={() => {
            let prevPage = page - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-base-300 border-base-300" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}

        <button
          className="btn btn-xs sm:btn-md"
          onClick={() => {
            let nextPage = page + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default PaginationContainer
