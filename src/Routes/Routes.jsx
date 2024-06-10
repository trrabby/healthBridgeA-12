import {
  createBrowserRouter,

} from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { MainLayout } from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import { AvailableCamp } from "../Pages/AvailableCamp/AvailableCamp";
import { JoinUs } from "../Pages/JoinUs/JoinUs";
import { Register } from "../Pages/Register/Register";
import { DashBoard } from "../Pages/Dashboard/DashBoard";
import { PrivateRoute } from "../Providers/PraivateRoute";
import { MyProfile } from "../Pages/Profile/MyProfile";
import { AddCamp } from "../Pages/Dashboard/Organizer/AddCamp";
import { CampDetails } from "../Pages/AvailableCamp/CampDetails";
import { ManageCamp } from "../Pages/Dashboard/Organizer/ManageCamp";
import { OrganizerRoute } from "../Providers/OrganizerRoute";
import { MostRegCamps } from "../Pages/Dashboard/Organizer/MostRegCamps";
import { UpdateCamp } from "../Pages/Dashboard/UpdateCamp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/availableCamps',
        element: <AvailableCamp></AvailableCamp>
      },
      {
        path: '/campDetails/:id',
        element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>
      },
      {
        path: '/joinUs',
        element: <JoinUs></JoinUs>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/myProfile',
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>

      },
      {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
          
          { 
            path: 'organizerProfile',
            element: <MyProfile></MyProfile>
          },
          {
            path: 'addACamp',
            element: <OrganizerRoute><AddCamp></AddCamp></OrganizerRoute>
          },
          {
            path: 'manageCamp',
            element:<OrganizerRoute><ManageCamp></ManageCamp></OrganizerRoute>
          },
          {
            path: 'mngRegCamp',
            element:<OrganizerRoute><MostRegCamps></MostRegCamps></OrganizerRoute>
          },
          {
            path: 'update/:id',
            element:<OrganizerRoute><UpdateCamp></UpdateCamp></OrganizerRoute>
          },


        ]
      }
    ]
  },

]);

export default router