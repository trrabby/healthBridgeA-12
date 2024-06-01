import {
    createBrowserRouter,
    
  } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { MainLayout } from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element:<MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children:[
        {
            index: true,
            element: <Home></Home>,
        }
      ]
    },
  ]);

  export default router