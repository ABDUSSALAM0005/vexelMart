import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"

import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Layout from "../components/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
    ],
  },
])

export default function Navigation() {
  return <RouterProvider router={router} />
}