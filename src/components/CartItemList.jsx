import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const CartItemList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems)

  return (
    <div>
      {cartItems.map((Item) => {
        return <CartItem key={Item.cartID} cartItem={Item} />
      })}
    </div>
  )
}

export default CartItemList
