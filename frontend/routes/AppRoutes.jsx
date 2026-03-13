//defines all of the application routes and what component to show for each route

//IMPORTS ______________________________________________
import { Routes, Route, Navigate } from "react-router-dom";
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
export default function AppRoutes() {
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
        <Route path="/veiwProfile/:userId" element={<ViewProfile />} />
      </Route>

      {/* fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}