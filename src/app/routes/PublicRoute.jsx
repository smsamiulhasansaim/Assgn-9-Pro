import { createBrowserRouter, Navigate } from "react-router";
import Root from "../providers/Roots";
import Home from "../../pages/Home/Home";
import ToyDetails from "../../pages/ToyDetails/ToyDetails";
import Shop from "../../pages/Shop/Shop";
import NotFound from "../../pages/NotFound/Page404/NotFound";
import Login from "../../auth/components/Login/Login";
import Register from "../../auth/components/Register/Register";
import ForgotPassword from "../../auth/components/ForgotPassword/ForgotPassword";
import EnhancedPrivateRoute from "./EnhancedPrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },

      {
        path: "/shop",
        element:(
           <EnhancedPrivateRoute>
          <Shop />
        </EnhancedPrivateRoute>
        ),
      },
      
      {
        path: "/toy/:toyId",
        element: (
          <EnhancedPrivateRoute>
            <ToyDetails />
          </EnhancedPrivateRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <EnhancedPrivateRoute>
            <div>My Favorites Page</div>
          </EnhancedPrivateRoute>
        ),
      },
      {
        path: "/games",
        element: (
          <EnhancedPrivateRoute>
            <div>Games Page</div>
          </EnhancedPrivateRoute>
        ),
      },
      {
        path: "*",
        Component: NotFound,
      }
    ]
  },
]);