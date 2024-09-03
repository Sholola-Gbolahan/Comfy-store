import { useState } from "react"
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs"
import { FaBarsStaggered } from "react-icons/fa6"
import { NavLink } from "react-router-dom"

//2. Object setup to hold themes name
const themes = {
  winter: "winter",
  dracula: "dracula",
}

const Navbar = () => {
  //3. Setting the default value of theme to winter
  const [theme, setTheme] = useState(themes.winter)
  const handleTheme = () => {
    // 4. Getting the themes values
    const { winter, dracula } = themes
    //5. Checking to see if the theme value is winter and if so changing the value to dracula.
    const newTheme = theme === winter ? dracula : winter
    // 6. Entering the document element root to setup new entering of "Data-theme"
    document.documentElement.setAttribute("data-theme", theme)
    //7. storing the new theme selection into theme state
    setTheme(newTheme)
  }

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
