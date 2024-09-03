import { useEffect, useState } from "react"
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs"
import { FaBarsStaggered } from "react-icons/fa6"
import { NavLink } from "react-router-dom"

const themes = {
  winter: "winter",
  dracula: "dracula",
}
// A function to get the theme from local storage
const getThemeFromLocalStorage = () => {
  // 4. Getting the theme value and setting up a defualt value if local storage is empty
  return localStorage.getItem("theme") || themes.winter
}

const Navbar = () => {
  // 5. Getting the theme value from local storage
  const [theme, setTheme] = useState(getThemeFromLocalStorage())
  const handleTheme = () => {
    const { winter, dracula } = themes
    const newTheme = theme === winter ? dracula : winter
    setTheme(newTheme)
  }
  // This condition is to add HTML element and store the value in local storage
  useEffect(
    () => {
      //2. storing theme value into html element
      document.documentElement.setAttribute("data-theme", theme)
      //3. storing the the value into local storage
      localStorage.setItem("theme", theme)
    },
    //1.Setting condition to run every time the theme value changes
    [theme]
  )

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
              Nav Links
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal"> Nav links</ul>
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
                8
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
