import {
  ComplexPaginationContainer,
  Filter,
  ProductsContainer,
} from "../components"
import { customFetch } from "../utils"

const url = "/products"

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  }
}
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // Extracting the selected filter value and converting from array into object and storing all values into params
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    // Passing the params as query into our URL
    const response = await queryClient.ensureQueryData(allProductsQuery(params))

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
      <ComplexPaginationContainer />
    </>
  )
}

export default Products
