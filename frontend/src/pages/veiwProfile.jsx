// profile page others veiw have interets, languages, about, text, add, level, profile pic 
// page for viewing another user's profile


//IMPORTS___________________________________________
import { useParams } from "react-router-dom";


//COMPONENT FUNCTION _____________________________________
export default function ViewProfile() {


//HOOKS / STATE SETUP _____________________________________
  const { userId } = useParams(); // later this will be used to load the correct user's profile from backend

  // temporary placeholder until backend is connected
  const profile = {
    level: 6,
    name: "millie",
    username: "name",
    interests: "music, films, hiking",
    languages: "english, spanish, irish", /// need to make into drop down menu 
    about: "i like learning through convo",
  };


//HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleText = () => {
    console.log("text :", userId);
  };

  const handleAddFriend = () => {
    console.log("add friend :", userId);
  };


//RETURN JSX AKA UI________________________________________
  return (
    <div className="view-profile-page">

      <div className="view-profile-grid">

        {/* left side */}
        <div className="view-profile-left">

          <p className="profile-level">level {profile.level}</p>

          <div className="profile-avatar-box">
            <div className="profile-avatar">👤</div>
          </div>

          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-username">{profile.username}</p>

          <div className="profile-actions">
            <button onClick={handleText}>text</button>
            <button onClick={handleAddFriend}>add friend</button>
          </div>

        </div>

        {/* right side */}
        <div className="view-profile-right">

          <div className="profile-info-card">
            <h3>Interests</h3>
            <p>{profile.interests}</p>
          </div>

          <div className="profile-info-card">
            <h3>Languages</h3>
            <p>{profile.languages}</p>
          </div>

          <div className="profile-info-card">
            <h3>About</h3>
            <p>{profile.about}</p>
          </div>

        </div>

      </div>

    </div>
  );
}