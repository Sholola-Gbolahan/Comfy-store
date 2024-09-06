import { Hero } from "../components"

import { customFetch } from "../utils"
const url = "/products"

export const loader = async () => {
  const response = await customFetch(url)
  const products = response.data.data

  return { products }
}

const Landing = () => {
  return (
    <>
      <Hero />
    </>
  )
}

export default Landing
