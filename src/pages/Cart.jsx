import { Link } from "react-router-dom"
import { SectionTitle, CartItemList, CartTotals } from "../components"
import { useSelector } from "react-redux"

const Cart = () => {
  // accessing user
  const user = useSelector((state) => state.userState.user)
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)
  console.log(numItemsInCart)

  if (numItemsInCart === 0) {
    return <SectionTitle text="your cart is empty" />
  }
  return (
    <div>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemList />
        </div>

        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />

          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              Please login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
