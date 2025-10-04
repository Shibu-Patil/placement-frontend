import { createBrowserRouter } from "react-router-dom";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Home from "../components/home/home/Home";
import DashBoard from "../components/home/dashboard/DashBoard";
import AddGrooming from "../components/home/addGrooming/AddGrooming";
import AddTrainers from "../components/home/addTrainers/AddTrainers";
import SearchGrooming from "../components/home/searchGrooming/SearchGrooming";
import UpdateGrooming from "../components/home/updateGrooimg/UpdateGrooming";

const routes= createBrowserRouter([
    {
        path:"/login",
        element:<Login></Login>
    },{
        path:"/register",
        element:<Register></Register>
    },{
        path:"/",
        element:<Home></Home>,
        children:[
            {
                index:true,
                element:<DashBoard></DashBoard>
            },{
                path:"/add-groomming",
                element:<AddGrooming></AddGrooming>
            },{
                path:"/add-trainers",
                element:<AddTrainers></AddTrainers>
            },{
                path:"/search-grooming",
                element:<SearchGrooming></SearchGrooming>
            },{
                path:"update-grooming",
                element:<UpdateGrooming></UpdateGrooming>
            }
        ]
    }
])


export default routes