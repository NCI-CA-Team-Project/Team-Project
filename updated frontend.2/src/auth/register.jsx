//IMPORTS___________________________________________
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth.js";
import logo from "../assets/logo.png";

//COMPONENT FUNCTION _____________________________________
export default function Register() {

//HOOKS / STATE SETUP _____________________________________
  const [name, setName] = useState(""); //stores the values typed into fields
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //stores error messages and load state so  so we can give feedback and disable buttons while we wait for backend 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {//runs when user clicks register 
    e.preventDefault();//stops refreshing 
    setError("");//removes erros 

  //HELPER FUNCTIONS AND HANDLERS _____________________________________
    if (
      !name.trim() || !surname.trim() || !birthdate || !email.trim() || !username.trim() || !password || !confirmPassword
    ) {
      setError("You havent filled out all of the fields");
      return; //checks everything is filled out 
    }

    if (password !== confirmPassword) {
      setError("your passwords do not match, please try again");
      return;
    }

    setLoading(true); // diables button while we wait for backend response

    const result = await register({ //calls backend and gives user inputs then waits for response 
      firstName: name.trim(),
      lastName: surname.trim(),
      birthday: birthdate,
      email: email.trim(),
      username: username.trim(),
      password,
      learningLanguage: "English",
    });

    if (result.ok) navigate("/login"); //if backend says registration was sucessful we take them to login page
    else setError(result.error || "Registration failed.");
    setLoading(false);// activate button again 
  };


//RETURN JSX AKA UI________________________________________
  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        {/*app logo above the form*/}
      <div className="auth-logo-wrap">
        <img src={logo} alt="Lingo logo" className="auth-logo" />
      </div>

        <h1>Register</h1>
      <p className="auth-subtitle">Create your Lingo account</p>

        {/*only shows an error message if there is one */}
        {error && <p className="auth-error">{error}</p>}


        {/*registration form*/}
        <form onSubmit={handleSubmit}>
          <input placeholder="name"
           value={name} 
           onChange={(e) => setName(e.target.value)} 
           />

          <input placeholder="surname"
           value={surname} 
           onChange={(e) => setSurname(e.target.value)}
          />

          <input type="date"
           value={birthdate} 
           onChange={(e) => setBirthdate(e.target.value)} 
           />

          <input placeholder="email"
           value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />

          <input placeholder="username" 
          value={username}
           onChange={(e) => setUsername(e.target.value)} 
           />

          <input placeholder="password"
           type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            />

          <input placeholder="confirm password"
           type="password" 
           value={confirmPassword} 
           onChange={(e) => setConfirmPassword(e.target.value)} 
           />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      </div>
    </div>
  );
}