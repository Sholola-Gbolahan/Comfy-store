import { redirect, useLoaderData } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"
import {
  ComplexPaginationContainer,
  OrderList,
  SectionTitle,
} from "../components"

const orderQuery = (params, user) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user
    if (!user) {
      toast.warn("You must be login to access the page")
      return redirect("/login")
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    try {
      const response = await queryClient.ensureQueryData(
        orderQuery(params, user)
      )

      console.log(response)

      return { orders: response.data.data, meta: response.data.meta }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "There was an error accessing Orders "
      toast.error(errorMessage)
      const ErrorCheck = error?.response?.status === 401 || 403
      if (ErrorCheck) return redirect("/login")
      return null
    }
  }

const Orders = () => {
  const { meta } = useLoaderData()

  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders
