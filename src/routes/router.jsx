
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";
import SigninSignup from "../pages/SigninSignup";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import HomeLayout from "../layouts/HomeLayout";
import CreateGroup from "../pages/CreateGroup";

const router = createBrowserRouter([
  { 
    path: "/", element: <HomeLayout></HomeLayout>
   },
  { 
    path: "/", element: <Home /> 
  },
  { 
    path: "/all-groups", 
    loader: () => fetch("http://localhost:3000/hobbies"),
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
   path:"/create-group",
   element: (
      <PrivateRoute>
        <CreateGroup />
      </PrivateRoute>
    ),
  },
  {
     path: "/sign-in-sign-up", element: <SigninSignup /> 
  },
  { 
  path: "/signup", element: <SignUp /> 
},
]);

export default router;
