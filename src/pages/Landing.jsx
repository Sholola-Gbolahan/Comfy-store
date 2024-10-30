import { FeaturedProducts, Hero, LandingProductsContainer } from "../components"

import { customFetch } from "../utils"

const allProductsQuery = {
  queryKey: ["products"],
  queryFn: () => customFetch.get("/products"),
}

const featuredProductsQuery = {
  queryKey: ["featuredProducts"],
  queryFn: () => customFetch.get("/products/?featured=true"),
}

export const loader = (queryClient) => async () => {
  const allProductsResponse = await queryClient.ensureQueryData(
    allProductsQuery
  )
  const products = allProductsResponse.data.data

  const featuredProductsResponse = await queryClient.ensureQueryData(
    featuredProductsQuery
  )
  const featuredProducts = featuredProductsResponse.data.data
  return { products, featuredProducts }
}

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <LandingProductsContainer />
    </>
  )
}

export default Landing
