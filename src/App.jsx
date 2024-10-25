import {
  About,
  Cart,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  Register,
  SingleProduct,
  Orders,
  Checkout,
} from "./pages"

import { ErrorElement } from "./components"
import { store } from "./store"

// LOADER
import { loader as landingLoader } from "./pages/Landing"
import { loader as singlePageLoader } from "./pages/SingleProduct"
import { loader as productsLoader } from "./pages/Products"
import { loader as checkoutLoader } from "./pages/Checkout"
import { loader as ordersLoader } from "./pages/Orders"

// ACTIONS
import { action as registerAction } from "./pages/Register"
import { action as loginAction } from "./pages/Login"
import { action as checkoutAction } from "./components/CheckoutForm"

import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader,
      },

      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: productsLoader,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singlePageLoader,
      },
      {
        path: "checkout",
        element: <Checkout />,
        errorElement: <ErrorElement />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorElement />,
        loader: ordersLoader(store),
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },

  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
