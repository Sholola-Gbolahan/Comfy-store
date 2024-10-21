import { NavLink } from "react-router-dom"

import { useSelector } from "react-redux"

//1. creating an array of links
const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "orders", text: "orders" },
]

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user)
  return (
    <>
      {/* 2. interating over the links */}
      {links.map(({ id, url, text }) => {
        // condtion to hide checkout and order if no user exit
        if ((url === "checkout" || url === "orders") && !user) return null
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}

export default NavLinks
