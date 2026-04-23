import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Order from "../Pages/Order";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Contact from "../Pages/Contact";
import PrivateRoute from "./PrivetRoute";
import Cart from "../Pages/Cart";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../Pages/AllUser";
import AdminRoute from "./AdminRoute";
import AddItem from "../Pages/AddItem";
import ManageItem from "../Pages/ManageItem";
import UpdateItem from "../Pages/UpdateItem";
import Payment from "../Pages/Payment";
import PaymentHistory from "../Pages/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact></Contact>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      // User Section Route
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path:"payment",
        element: <Payment></Payment>
      },

      // Admin Section route
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path:"payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "addItem",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "manageItem",
        element: (
          <AdminRoute>
            <ManageItem></ManageItem>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
