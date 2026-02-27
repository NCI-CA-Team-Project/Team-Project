// homepage before login technically a landing page 


// IMPORTS ______________________________________________
import { Link, useNavigate } from "react-router-dom";


// temporary landing page

//COMPONENT FUNCTION _____________________________________
export default function Home() {

//HOOKS / STATE SETUP _____________________________________
//HELPER FUNCTIONS AND HANDLERS _____________________________________
  //RETURN JSX AKA UI________________________________________
  return (
    <div style={{ padding: 100 }}>
      <h1>Lingo</h1>
      <p>Home page works just for login functions</p>
      <p><Link to="/login">Login here</Link></p>
      <p><Link to="/register">Dont have an account? register here</Link></p>
      
    </div>
  );
}