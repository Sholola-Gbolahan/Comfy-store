import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

// A function getting updated values from local storage
const getCartFromLocalStorage = () => {
  // json.parse is converting string to object as local storage stores in strings
  // defaultState is returned if there's no value in localStorage
  return JSON.parse(localStorage.getItem("cart")) || defaultState
}

const cartSlice = createSlice({
  name: "cart",
  // Updating initial state with getCartFromLocalStorage function
  initialState: getCartFromLocalStorage(),

  reducers: {
    addItem: (state, action) => {
      // 3. distructring the product values
      const { product } = action.payload
      // 4. checking into the cart Items to see if item is already existed, to increase it if so
      const item = state.cartItems.find((i) => i.cartID === product.cartID)
      // 5. adding the condition to increase the product amount in cart if already existed
      if (item) {
        item.amount += product.amount
      }
      // 6. Adding the product to cart if not already existed
      else {
        state.cartItems.push(product)
      }

      // 7. Updating totals, localStorage and ordertotal in state
      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.cartTotal + state.shipping + state.tax
      localStorage.setItem("cart", JSON.stringify(state))
      toast.success("item added to cart")
    },

    clearCart: (state) => {},

    removeItem: (state, action) => {},
    editItem: (state, action) => {},
  },
})

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
