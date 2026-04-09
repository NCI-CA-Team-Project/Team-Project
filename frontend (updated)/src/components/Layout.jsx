//IMPORTS___________________________________________
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {logout} from "../api/auth.js";

//COMPONENT FUNCTION _____________________________________
export default function Layout() {


//HOOKS / STATE SETUP _____________________________________
const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();

const closeMenu = () => setMenuOpen(false);

const handleLogout = () => {
  logout(); // removes token
  localStorage.removeItem("username"); // remove stored username
  closeMenu();
  navigate("/login"); // redirect to login page
};


//Return JSX AKA UI________________________________________
  return (
    <div className="app-shell">

      {/* top navigation bar */}
      <header className="topbar">

        {/* hamburger button that opens the side menu */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* app name */}
        <h2 className="logo">Lingo</h2>

      </header>


      {/* dark overlay behind the menu when it opens */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={closeMenu}
        />
      )}


      {/* slide-out menu panel */}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`}>

        {/* menu header */}
        <div className="menu-header">

          <h3>Menu</h3>

          {/* button to close menu */}
          <button
            className="close-btn"
            onClick={closeMenu}
          >
            ✕
          </button>

        </div>


        {/* navigation links */}
        <nav className="menu-links">

          {/* each link closes the menu when clicked */}

          <NavLink
            to="/home"
            className="menu-item"
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/messages"
            className="menu-item"
            onClick={closeMenu}
          >
            Messages
          </NavLink>

          <NavLink
            to="/profile"
            className="menu-item"
            onClick={closeMenu}
          >
            Profile
          </NavLink>

          <NavLink
            to="/stats"
            className="menu-item"
            onClick={closeMenu}
          >
            Stats
          </NavLink>

          <NavLink
            to="/requests"
            className="menu-item"
            onClick={closeMenu}
          >
            Requests
          </NavLink>

        <button className="menu-item logout-btn" onClick={handleLogout}>
            Logout
        </button>
        </nav>

      </aside>


      {/* main content area where pages render */}
      <main className="page-content">

        {/* Outlet tells React Router where to render child pages */}
        <Outlet />

      </main>

    </div>
  );
}