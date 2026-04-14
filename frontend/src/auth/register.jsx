/*
 * TESTING - Vincentas
 * Black Box: 9 test cases, 100% coverage
 * White Box: Branch + Statement + Condition - 100% coverage
 * Result: All passed
 */

//IMPORTS___________________________________________
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth.js";


//COMPONENT FUNCTION _____________________________________
export default function Register() {

//HOOKS / STATE SETUP _____________________________________
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    const ok = await register({ //calls backend and gives user inputs then waits for response 
      name: name.trim(),
      surname: surname.trim(),
      birthdate,
      email: email.trim(),
      username: username.trim(),
      password,
      confirmPassword,
    });

    if (ok) navigate("/"); //if registration is valid they are sent to home will change this to send to login as i think that how most sites work 
    else setError("Register is not available yet (backend missing).");

    setLoading(false);// activate button again 
  };


//RETURN JSX AKA UI________________________________________
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Register</h1>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
          <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input placeholder="confirm password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: 10 }}>
          Already have an account with us? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}