import { redirect, useLoaderData } from "react-router-dom"
import { customFetch } from "../utils"
import { toast } from "react-toastify"
import { OrderList, PaginationContainer, SectionTitle } from "../components"

export const loader =
  (store) =>
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
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

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
      <PaginationContainer />
    </>
  )
}

export default Orders
