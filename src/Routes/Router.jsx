import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Menu from "../Pages/Menu";
import Order from "../Pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: "/",
            element: <Home></Home>
        },
         {
          path: "/menu",
          element: <Menu></Menu>
        },
        {
          path: '/order',
          element: <Order></Order>
        }
    ]
  },
]);

export default router