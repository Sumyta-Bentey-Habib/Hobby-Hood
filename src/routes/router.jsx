
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";
import SigninSignup from "../pages/SigninSignup";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../components/PrivateRoute";
import HomeLayout from "../layouts/HomeLayout";

const router = createBrowserRouter([
  { 
    path: "/", element: <HomeLayout></HomeLayout>
   },
  { 
    path: "/", element: <Home /> 
  },
  { 
    path: "/allgroups", element: <AllGroups />
 },
  {
    path: "/mygroups",
    element: (
      <PrivateRoute>
        <MyGroups />
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
