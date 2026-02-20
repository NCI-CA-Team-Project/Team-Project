//defines all of the aplication routes and what component to dhow for each route


import { Routes, Route, Navigate } from "react-router-dom"; // importing the routing tools from the react router then the page componenets from project 
import Login from "../auth/login";
import Register from "../auth/register";
import Home from "../pages/home";

export default function AppRoutes() {//sets up routing for login register nad home page 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* fallback : if the user tries to use a route that doesnt exist they will be redirected to the home page*/}   
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}