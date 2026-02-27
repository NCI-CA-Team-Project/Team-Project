//IMPORTS___________________________________________
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";


//COMPONENT FUNCTION _____________________________________
export default function Layout() {
  //HOOKS / STATE SETUP _____________________________________
  const [open, setOpen] = useState(true);
//Return JSX AKA UI________________________________________
  return (
    <div className={`app ${open ? "nav-open" : "nav-closed"}`}>
      <aside className="sidebar">
        <div className="sidebar-top">
          <button className="toggle" onClick={() => setOpen((v) => !v)}>
            {open ? "⟨" : "⟩"}
          </button>
          {open && <h3 className="brand">Lingo</h3>}
        </div>

        <nav className="nav">
          <NavLink to="/" end className="item">Home</NavLink>
          <NavLink to="/messages" className="item">Messages</NavLink>
          <NavLink to="/stats" className="item">Stats</NavLink>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}