import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";
import SigninSignup from "../pages/SigninSignup";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import HomeLayout from "../layouts/HomeLayout";
import CreateGroup from "../pages/CreateGroup";
import ErrorPage from "../pages/ErrorPage"; 
import UpdateHobby from "../components/UpdateHobby";

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <HomeLayout><Home /></HomeLayout>,
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/all-groups", 
    loader: () => fetch("https://hobby-hood-server-site.vercel.app/hobbies"),
    element: <AllGroups />
  },
  {
    path: "/my-groups",
    element: (
      <PrivateRoute>
        <MyGroups />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-group",
    element: (
      <PrivateRoute>
        <CreateGroup />
      </PrivateRoute>
    ),
  },
  {
    path: "/sign-in-sign-up", 
    element: <SigninSignup /> 
  },
  { 
    path: "/signup", 
    element: <SignUp /> 
  },
  {
   path:"/update-hobby/:id" ,
  element:<UpdateHobby />
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
