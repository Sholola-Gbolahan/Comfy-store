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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // This is setting how long the query is going to last for\
      // This is 1secs X 60 = 1 min (1*5 = 5min)
      // The valid time for query is set to 5 min
      staleTime: 1000 * 60 * 5,
    },
  },
})

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
        loader: landingLoader(queryClient),
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
        loader: productsLoader(queryClient),
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: singlePageLoader(queryClient),
      },
      {
        path: "checkout",
        element: <Checkout />,
        errorElement: <ErrorElement />,
        loader: checkoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        errorElement: <ErrorElement />,
        loader: ordersLoader(store, queryClient),
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
