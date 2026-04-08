//IMPORTS___________________________________________
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {logout} from "../api/auth.js";
import logo from "../assets/logo.png";
//COMPONENT FUNCTION _____________________________________
export default function Layout() {


//HOOKS / STATE SETUP _____________________________________
const [menuOpen, setMenuOpen] = useState(false);//checks if the side menu is open or closed
const navigate = useNavigate();

const closeMenu = () => setMenuOpen(false);//closs the side menu

const handleLogout = () => {//logs the user out, clears strored user data and closes the menu returning to login page
  logout(); // removes token
  localStorage.removeItem("username"); // remove stored username
  closeMenu();
  navigate("/login"); // redirect to login page
};


//Return JSX AKA UI________________________________________
  return (
    <div className="app-shell">

      {/* sticky top navigation bar */}
      <header className="topbar">
        {/* hamburger button that opens the side menu */}
        <button className="menu-btn" onClick={() => setMenuOpen(true)}  >
          ☰
        </button>

        {/* app logo*/}
        <h2 className="logoTopBar"><img src={logo} alt="Lingo Logo" className="logo" /></h2>
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
            to="/pay"
            className="menu-item"
            onClick={closeMenu}
          >
            Premium
          </NavLink>

        <button className="menu-item logout-btn" onClick={handleLogout}>
            Logout
        </button>
        </nav>

      </aside>


      {/* main content area where pages render */}
      <main className="page-content">

        {/* outlet is a placeholder for whichever child page is currently open*/}
        <Outlet />

      </main>

    </div>
  );
}