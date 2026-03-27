//defines all of the aplication routes and what component to dhow for each route


//IMPORTS ______________________________________________

import { Routes, Route, Navigate } from "react-router-dom"; // importing routes which is a container for route definitions
                                                            //importing route which define sone route
                                                            //importing naviaget to redirect users 
import Login from "../auth/login";
import Register from "../auth/register";
import Landing from "../pages/landing";
import Home from "../pages/home";
import Chat from "../pages/Chat";
import Pay from "../pages/pay";
import Profile from "../pages/profile";
import Layout from "../components/Layout";
import Stats from "../pages/stats";
import Messages from "../pages/messages";
import ViewProfile from "../pages/veiwProfile";

//COMPONENT FUNCTION _____________________________________
export default function AppRoutes() { // sets up routing for landing login register and app pages
  return (
    <Routes>
      {/* public pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* app pages inside layout */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/viewProfile" element={<ViewProfile />} />
      </Route>

      {/* fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  //now i can say inside app components <Link to="/register">Register here</Link> and itll take user to register page  
}