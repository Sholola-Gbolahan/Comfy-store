import { useLoaderData } from "react-router-dom"
import { formatPrice, customFetch } from "../utils"
import { Link } from "react-router-dom"
import { useState } from "react"

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`)

  return { product: response.data.data }
}

const SingleProduct = () => {
  const { product } = useLoaderData()
  const { image, title, price } = product.attributes
  const amount = formatPrice(price)

  return <div>SingleProduct</div>
}

export default SingleProduct
