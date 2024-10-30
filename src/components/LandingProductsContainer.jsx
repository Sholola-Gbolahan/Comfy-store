import { ProductsGrids, ProductsList, SectionTitle } from "./"
import { useState } from "react"
import { BsFillGridFill, BsList } from "react-icons/bs"

const LandingProductsContainer = () => {
  const [layout, setLayout] = useState("grid")

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`
  }
  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <SectionTitle text="All Product" />
        <div className="flex gap-x-2">
          <button
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>

          <button
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>{layout === "grid" ? <ProductsGrids /> : <ProductsList />}</div>
    </>
  )
}

export default LandingProductsContainer
