/*
 * TESTING - Vincentas
 * Black Box: 7 test cases, 100% coverage
 * White Box: Branch + Statement - 100% coverage
 * Result: All passed
 */

// profile page others veiw have interets, languages, about, text, add, level, profile pic 
// page for viewing another user's profile


//IMPORTS___________________________________________
import { useParams } from "react-router-dom";


//COMPONENT FUNCTION _____________________________________
export default function Profile() {


//HOOKS / STATE SETUP _____________________________________
  const { userId } = useParams(); // later this will be used to load the correct user's profile from backend

    const [name, setName] = useState(name);
    const [surname, setSurname] = useState(surname);
    const [username, setUsername] = useState(username);
    const [password, setPassword] = useState("change password");
    const [confirmPassword, setConfirmPassword] = useState("confirm your password");
  
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


//HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleEdit = () => {
    console.log("edit :", userId);
  };

  const handleSave = () => {
    console.log("save  :", userId);
  };


//RETURN JSX AKA UI________________________________________
  return (
    <div className="profile-page">

      <div className="profile-grid">

        {/* left side */}
        <div className="profile-left">

          <p className="my-profile-level">level {profile.level}</p>

          <div className="my-profile-avatar-box">
            <div className="my-profile-avatar">👤</div>
          </div>

          <h2 className="my-profile-name">{profile.name}</h2>
          <p className="my-profile-username">{profile.username}</p>

          <div className="profile-actions">
            <button onClick={handleEdit}>text</button>
            <button onClick={handleSave}>add friend</button>
          </div>

        </div>

        {/* right side */}
        <div className="profile-right">

          <div className="my-profile-info-card">
            <h3>interests</h3>
            <p>{profile.interests}</p>
          </div>

          <div className="my-profile-info-card">
            <h3>languages</h3>
            <p>{profile.languages}</p>
          </div>

          <div className="my-profile-info-card">
            <h3>about</h3>
            <p>{profile.about}</p>
          </div>

        </div>

      </div>

    </div>
  );
}