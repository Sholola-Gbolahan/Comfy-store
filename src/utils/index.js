import axios from "axios"

const productionURL = "https://strapi-store-server.onrender.com/api"

export const customFetch = axios.create({
  baseURL: productionURL,
})

export const formatPrice = (price) => {
  const amount = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price)
  return amount
}
