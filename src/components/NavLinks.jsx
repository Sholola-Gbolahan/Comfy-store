import { NavLink } from "react-router-dom"

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
  return (
    <>
      {/* 2. interating over the links */}
      {links.map(({ id, url, text }) => {
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
