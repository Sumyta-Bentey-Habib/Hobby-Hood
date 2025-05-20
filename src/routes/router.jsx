import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import MyGroups from "../pages/MyGroups";

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

    }
])

export default router;