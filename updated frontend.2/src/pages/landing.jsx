// homepage before login technically a landing page 


// IMPORTS ______________________________________________
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

// temporary landing page

//COMPONENT FUNCTION _____________________________________
export default function Home() {
  
//HOOKS / STATE SETUP _____________________________________
//HELPER FUNCTIONS AND HANDLERS _____________________________________
  //RETURN JSX AKA UI________________________________________
return (
  <div className="auth-wrapper">
    <div className="auth-card">
      <div className="auth-logo-wrap">
        <img src={logo} alt="Lingo logo" className="auth-logo" />
      </div>

      <h1>Lingo</h1>
      <h2 className="auth-subtitle">Learn languages through real conversations</h2>

      <div className="auth-actions">
        <p className="auth-switch">
          Have an account with us? <Link to="/login">Login here</Link>
        </p>

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  </div>
);
}
