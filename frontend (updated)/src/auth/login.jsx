

//IMPORTS___________________________________________
import { useState } from "react"; //so i can store live values inside my componenet 
import { useNavigate, Link } from "react-router-dom"; //lets us hardcode in naviagtion like sending user to homepage after login, and link lets us being other components onto the screen the user picks 
import { login } from "../api/auth.js"; //this function talks to backend 


//COMPONENT FUNCTION _____________________________________
export default function Login() { //this function runs the login page logic and ui when its called eg through a lkink 

//HOOKS / STATE SETUP _____________________________________
  const [username, setUsername] = useState(""); //starting with "" then setID is a function to updat eit to users input 
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //creates a fucntion i can use to naviagte user 


//HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleSubmit = async (e) => { // this runs when user clicks login 
    e.preventDefault();//stops refreshing when forms submitted which is important because react app is a spa so we dont want to refresh the page and lose all our state and stuff
    setError(""); //clears old error messages 

    if (!username.trim() || !password) {//clears whitspace and checks user entered all fields 
      setError("Please enter your username and password");
      return;
    }

    setLoading(true); // disables button and changes text to logging in 

    const ok = await login(username.trim(), password);//  calls backend and waits for response 

    if (ok) navigate("/home");//sucess = they go home page 
    else setError("Login failed.");

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
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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