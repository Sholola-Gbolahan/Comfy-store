import { Filter, PaginationContainer, ProductsContainer } from "../components"
import { customFetch } from "../utils"

const url = "/products"
export const loader = async ({ request }) => {
  // Extracting the selected filter value and converting from array into object and storing all values into params
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  // Passing the params as query into our URL
  const response = await customFetch(url, { params })

  const products = response.data.data
  const meta = response.data.meta

  // Passing the params value down into loader for use in filter page
  return { products, meta, params }
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
