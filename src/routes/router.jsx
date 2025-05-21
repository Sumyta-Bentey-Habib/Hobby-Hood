import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";
import Login from "../pages/Login";
import SigninSignup from "../pages/SigninSignup";
import SignUp from "../pages/SignUp";

const router =createBrowserRouter([
    {
        path:'/',
        element:<HomeLayout />,
    },
    {
        path:'/home',
        element:<Home></Home>
    },
    {
        path:'/allgroups',
        element:<AllGroups></AllGroups>
    },
    {
        path:'/mygroups',
        element:<MyGroups></MyGroups>

    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/sign-in-sign-up',
        element:<SigninSignup></SigninSignup>
    },
    {
        path:'/signup',
        element:<SignUp></SignUp>
    }

])

export default router;