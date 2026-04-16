/*
 * TESTING - Vincentas
 * Black Box: 7 test cases, 100% coverage
 * White Box: Branch + Statement + Condition - 100% coverage
 * Result: All passed
 */

//IMPORTS___________________________________________
import { useState } from "react"; //so i can store live values inside my componenet 
import { useNavigate, Link } from "react-router-dom"; //lets us hardcode in naviagtion like sending user to homepage after login, and link lets us being other components onto the screen the user picks 
import { login } from "../api/auth.js"; //this function talks to backend 


//COMPONENT FUNCTION _____________________________________
export default function Login() { //this function runs the login page logic and ui when its called eg through a lkink 

//HOOKS / STATE SETUP _____________________________________
  const [id, setId] = useState(""); //starting with "" then setID is a function to updat eit to users input 
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //creates a fucntion i can use to naviagte user 


//HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleSubmit = async (e) => { // this runs when user clicks login
    //1 
    e.preventDefault();//stops refreshing when forms submitted which is important because react app is a spa so we dont want to refresh the page and lose all our state and stuff
    //2
    setError(""); //clears old error messages 
    //3
    if (!id.trim() || !password) {//clears whitspace and checks user entered all fields 
      //4
      setError("Please enter your id and password");
      //5
      return;
    }
    //6
    setLoading(true); // disables button and changes text to logging in 
    //7
    const ok = await login(id.trim(), password);//  calls backend and waits for response 
    //8, 9
    if (ok) navigate("/home");//sucess = they go home page 
    //10
    else setError("Login failed.");
    //11
    setLoading(false); //stop loading state so button  is active again
  };


  //RETURN JSX AKA UI________________________________________
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Login</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Dont have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}