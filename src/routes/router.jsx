import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";

import HomeLayout from "../layouts/HomeLayout";
import CreateGroup from "../pages/CreateGroup";
import ErrorPage from "../pages/ErrorPage";
import UpdateHobby from "../components/UpdateHobby";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-groups",
        loader: () =>
          fetch("https://hobby-hood-server-site.vercel.app/hobbies"),
        element: <AllGroups />,
      },
      {
        path: "my-groups",
        element: <MyGroups />,
      },
      {
        path: "/about",
        element:<AboutPage></AboutPage>

      },
      {
        path: "create-group",
        element: <CreateGroup />,
      },
      {
        path: "/login",
        element:<Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "update-hobby/:id",
        element: <UpdateHobby />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
