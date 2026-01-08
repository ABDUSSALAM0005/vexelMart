import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from "react-router-dom"

import Home from "../pages/Home"
import DetailsPage from "../pages/DetailsPage"
import Layout from "../components/Layout"
import Error from "../components/Error"
import CartPage from "../pages/CartPage"
import SignIn from "../pages/SignIn"
import Shipping from "../pages/Shipping"
import ProtectedRoute from "./ProtectedRoute"
import ProfileScreen from "../pages/ProfileScreen"
import Register from "../pages/Register"
import PaymentMethod from "../pages/PaymentMethod"
import PlaceOrder from "../pages/PlaceOrder"
import Order from "../pages/Order"
import SearchScreen from "../components/SearchScreen"
import UserProfile from "../components/UserProfile"
import UserOrders from "../components/UserOrders"
import Reviews from "../components/Reviews"
import Security from "../components/Security"
import VerifyEmail from "../pages/VerifyEmail"
import AdminDashboard from "../context/AdminDashboard"
import AdminRoute from "./AdminRoute"

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/verify-email",
        element: 
        <ProtectedRoute> 
          <VerifyEmail />,
        </ProtectedRoute>
      },
      {
        path: "/search",
        element: <SearchScreen />,
      },
      {
        path: "/shipping",
        element: 
        <ProtectedRoute> 
          <Shipping />
        </ProtectedRoute>
      },
      {
        path: "/placeorder",
        element: 
        <ProtectedRoute> 
          <PlaceOrder />
        </ProtectedRoute>
      },
      {
        path: "/order/:id",
        element: 
        <ProtectedRoute> 
          <Order />
        </ProtectedRoute>
      },
      {
        path: "/payment",
        element: 
        <ProtectedRoute>
        <PaymentMethod />
        </ProtectedRoute>
      },
       // === START OF NESTED PROFILE ROUTES ===
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileScreen /> 
          </ProtectedRoute>
        ),
        // This 'children' array renders INSIDE ProfileScreen's <Outlet/>
        children: [
          {
            index: true, // Matches "/profile" exactly
            element: <UserProfile />, // This is your default view (Info/Settings)
          },
          {
            path: "orders", // Matches "/profile/orders"
            element: <UserOrders />,
          },
          {
            path: "reviews", // Matches "/profile/security"
            element: <Reviews />
          },
          {
            path: "security", // Matches "/profile/security"
            element: <Security />
          },
        ],
      },
      // === END OF NESTED PROFILE ROUTES ===

       // === START OF NESTED ADMIN ROUTES ===
      {
        path: "/admin",
        element: (
          <AdminRoute>
            <ProfileScreen /> 
          </AdminRoute>
        ),
        // This 'children' array renders INSIDE ProfileScreen's <Outlet/>
        children: [
          {
            index: true, // Matches "/admin" exactly
            element: <AdminDashboard />, // This is your default view (Info/Settings)
          },
          {
            path: "dashboard", // Matches "/admin/dashboard"
            element: <AdminDashboard />,
          },
          {
            path: "orders", // Matches "/admin/orders"
            element: <Reviews />
          },
          {
            path: "users", // Matches "/admin/users"
            element: <Security />
          },
        ],
      },
      // === END OF NESTED ADMIN ROUTES ===

    ],
  },
])

export default function Navigation() {
  return <RouterProvider router={router} />
}