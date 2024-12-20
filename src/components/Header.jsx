import { Link, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../features/user/UserSlice"
import { clearCart } from "../features/cart/cartSlice"
import { useQueryClient } from "@tanstack/react-query"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userState.user)
  const queryClient = useQueryClient()

  const handleLogout = () => {
    navigate("/")
    dispatch(clearCart())
    dispatch(logoutUser())
    // clearing out all queries when Logout
    queryClient.removeQueries()
  }

  return (
    <header className="bg-neutral py-2 text-neutral-content  ">
      <div className="align-element flex justified-center sm:justify-end">
        {user ? (
          //  USER
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.username}</p>
            <button
              className="btn btn-xs btn-outline btn-primary "
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          //  LINKS
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Sign in /Guest
            </Link>
            <Link to="/register" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
