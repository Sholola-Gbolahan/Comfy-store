import { Filter, PaginationContainer, ProductsContainer } from "../components"
import { customFetch } from "../utils"

const url = "/products"
export const loader = async () => {
  const response = await customFetch(url)

  const products = response.data.data
  const meta = response.data.meta

  return { products, meta }
}

const Products = () => {
  return (
    <>
      <Filter />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
