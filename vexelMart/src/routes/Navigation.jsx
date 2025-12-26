import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"

import Home from "../pages/Home"
import DetailsPage from "../pages/DetailsPage"
import Layout from "../components/Layout"
import Error from "../components/Error"
import CartPage from "../pages/CartPage"
import SignIn from "../pages/SignIn"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error/>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/slug/:slug",
        element: <DetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
])

export default function Navigation() {
  return <RouterProvider router={router} />
}