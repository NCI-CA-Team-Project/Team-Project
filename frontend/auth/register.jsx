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
  const [language, setLanguage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !surname.trim() ||
      !birthdate ||
      !email.trim() ||
      !username.trim() ||
      !language.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("You havent filled out all of the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match, please try again");
      return;
    }

    setLoading(true);

    const ok = await register({
      firstName: name.trim(),
      lastName: surname.trim(),
      birthday: birthdate,
      email: email.trim(),
      username: username.trim(),
      learningLanguage: language.trim(),
      password,
    });

    if (ok) navigate("/login");
    else setError("Registration failed.");

    setLoading(false);
  };


  //RETURN JSX AKA UI________________________________________
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Register</h1>

        {error && <p style={{ color: "crimson" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="language you want to learn"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />

          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            placeholder="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

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