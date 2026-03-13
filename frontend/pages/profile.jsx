// my profile page
// placeholder until backend profile endpoint is ready

//IMPORTS___________________________________________
import { useParams } from "react-router-dom";

//COMPONENT FUNCTION _____________________________________
export default function Profile() {

  //HOOKS / STATE SETUP _____________________________________
  const { userId } = useParams();

  // temporary placeholder until backend is connected
  const profile = {
    level: 6,
    name: "Your Name",
    username: "your_username",
    interests: "Add your interests later",
    languages: "Add your languages later",
    about: "This profile page is still a frontend placeholder.",
  };

  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  const handleEdit = () => {
    console.log("edit :", userId);
  };

  const handleSave = () => {
    console.log("save :", userId);
  };

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="profile-page">
      <div className="profile-grid">
        <div className="profile-left">
          <p className="my-profile-level">level {profile.level}</p>

          <div className="my-profile-avatar-box">
            <div className="my-profile-avatar">👤</div>
          </div>

          <h2 className="my-profile-name">{profile.name}</h2>
          <p className="my-profile-username">{profile.username}</p>

          <div className="profile-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>

        <div className="profile-right">
          <div className="my-profile-info-card">
            <h3>My interests</h3>
            <p>{profile.interests}</p>
          </div>

          <div className="my-profile-info-card">
            <h3>My languages</h3>
            <p>{profile.languages}</p>
          </div>

          <div className="my-profile-info-card">
            <h3>About me</h3>
            <p>{profile.about}</p>
          </div>
        </div>
      </div>
    </div>
  );
}