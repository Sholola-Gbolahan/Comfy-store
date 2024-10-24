import { Form, redirect } from "react-router-dom"
import FormInput from "./FormInput"
import SubmitBtn from "./SubmitBtn"
import { customFetch, formatPrice } from "../utils"
import { clearCart } from "../features/cart/cartSlice"
import { toast } from "react-toastify"

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData()
    const { name, address } = Object.fromEntries(formData)

    const user = store.getState.userState.user
    const { cartItems, orderTotal, numItemsInCart } = store.getState.cartState

    // compiling all gather info to send
    const info = {
      name,
      address,
      cartItems,
      ChargeTotal: formatPrice(orderTotal),
      numItemsInCart,
    }

    // making post request to server
    try {
      const response = await customFetch.post("/orders", info)
      store.dispatch(clearCart())
      toast.success("order placed successfully")
      return redirect("/")
    } catch (error) {
      console.log(error)
      const errorMessage = error?.response?.data?.message || "Order not placed"
      toast.error(errorMessage)
    }
  }

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput label="first name" type="text" name="name" />
      <FormInput label="address" type="text" name="address" />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  )
}

export default CheckoutForm