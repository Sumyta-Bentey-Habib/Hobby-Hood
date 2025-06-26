import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";
import SigninSignup from "../pages/SigninSignup";
import SignUp from "../pages/SignUp";
import HomeLayout from "../layouts/HomeLayout";
import CreateGroup from "../pages/CreateGroup";
import ErrorPage from "../pages/ErrorPage";
import UpdateHobby from "../components/UpdateHobby";
import Dashboard from "../components/Dashboard";

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
        path: "create-group",
        element: <CreateGroup />,
      },
      {
        path: "sign-in-sign-up",
        element: <SigninSignup />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
