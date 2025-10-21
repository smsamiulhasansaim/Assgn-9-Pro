import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../../pages/Home/Home";
import Page404 from "../../pages/NotFound/Page404/Page404";
import ToyDetails from "../../pages/ToyDetails/ToyDetails";
import Shop from "../../pages/Shop/Shop";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Page404></Page404>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
      path: "/Shop",
      Component: Shop,
      },
      { 
        path: "/toy/:toyId",
        Component:ToyDetails,
      },
    ]
  },
]);