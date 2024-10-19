import { useEffect, useState } from "react"
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs"
import { FaBarsStaggered } from "react-icons/fa6"
import { NavLink } from "react-router-dom"
import NavLinks from "./Navlinks"
import { useSelector } from "react-redux"

const themes = {
  winter: "winter",
  dracula: "dracula",
}
const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.winter
}

const Navbar = () => {
  //1. importing the number of items in cart from the Cart state with useSelector
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart)

  const [theme, setTheme] = useState(getThemeFromLocalStorage())
  const handleTheme = () => {
    const { winter, dracula } = themes
    const newTheme = theme === winter ? dracula : winter
    setTheme(newTheme)
  }
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* LOGO */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>

          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-small dropdown-content mt-3 z-[1] p-2 shadow bg-base-200"
            >
              {/* Adding Links to dropdown */}
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            {/* Adding Links to menu */}
            <NavLinks />{" "}
          </ul>
        </div>
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={handleTheme} />
            {/* Sun Icon */}
            <BsSunFill className="swap-on h-4 w-4" />
            {/* Moon Icon */}
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/* CART LINK */}
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {/* 2. Displaying the item value in the Ui */}
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
