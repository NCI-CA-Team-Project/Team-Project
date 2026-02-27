//defines all of the aplication routes and what component to dhow for each route


//IMPORTS ______________________________________________

import { Routes, Route, Navigate } from "react-router-dom"; // importing routes which is a container for route definitions
                                                            //importing route which define sone route
                                                            //importing naviaget to redirect users 
import Login from "../auth/login";//just importing my react components so i denfine their routes
import Register from "../auth/register";
import Home from "../pages/landing";
import Chat from "../pages/Chat";
import Pay from "../pages/pay";
import Profile from "../pages/profile";


//COMPONENT FUNCTION _____________________________________
export default function AppRoutes() {//sets up routing for login register nad home page 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/profile" element={<Profile />} />
      

      {/* for safety only but if user tries to use a route that doesnt exist they will be sent to the home page*/}   
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  //now i can say inside app components <Link to="/register">Register here</Link> and itll take user to register page  
}