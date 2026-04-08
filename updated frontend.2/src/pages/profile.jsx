//written by cameron 
//lets user see their profile and edit it 
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/api.js";



export default function Profile() {
  const [profile, setProfile] = useState(null);//stores profile data
  const [isEditing, setIsEditing] = useState(false);//controls whether the user is currently editing

  
 useEffect(() => {
  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/api/users/me", "GET");//requests users profile from backend
      setProfile(data);
      localStorage.setItem("user", JSON.stringify(data));//stores it i local storage
    } catch (err) {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setProfile(JSON.parse(storedUser));
      } else {
        setError("Failed to load profile.");
      }
    } finally {
      setLoading(false);
    }
  }

  loadProfile();
}, []);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {//switches user into editing mode
    setIsEditing(true);
  };

  const handleSave = async () => {//send updated version to backend and updates local storage 
  try {
    setLoading(true);
    setError("");

    const updatedProfile = await apiRequest("/api/users/me", "PUT", {
      firstName: profile.firstName,
      lastName: profile.lastName,
      learningLanguage: profile.learningLanguage,
      about: profile.about,
      profileImage: profile.profileImage
    });

    //updates the state and profile in local storage
    setProfile(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    localStorage.setItem("username", updatedProfile.username);
    setIsEditing(false);//switches out of edit mode
  } catch (err) {
    setError("Failed to save profile.");
  } finally {
    setLoading(false);
  }
};

  if (loading && !profile) {
  return <p>Loading profile...</p>;
  }

  if (!profile) {
  return <p>No profile data found.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-grid">
        {/*show error message if there is one*/}
        {error && <p className="profile-error">{error}</p>}

        {/*left side is avatar username and action button*/}
        <div className="profile-left">
          <p className="my-profile-level">level 1</p>

          <div className="my-profile-avatar-box">
             {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="my-profile-avatar-img"
              />
            ) : (
              <div className="my-profile-avatar">👤</div>
            )}
          </div>

            {/*image field is only shown when editing*/}
          {isEditing && (
            <div className="my-profile-info-card">
              <h3>Profile Image URL</h3>
              <input
              type="text"
              value={profile.profileImage || ""}
              onChange={(e) =>
                setProfile({ ...profile, profileImage: e.target.value })
              }
              placeholder="Paste image URL"
            />
          </div>
        )}

          <h2 className="my-profile-name">
            {profile.firstName || "Your Name"} {profile.lastName || ""}
          </h2>
          <p className="my-profile-username">
            @{profile.username || "username"}
          </p>

          {/*button changes when user is editing*/}
          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={handleEdit}>Edit Profile</button>
            ) : (
              <button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>

        {/*RIGHT SIDE is about section and the languages being lernt  */}
        <div className="profile-right">
          <div className="my-profile-info-card">
            <h3>Learning Language</h3>
            {isEditing ? (
              <input
                type="text"
                value={profile.learningLanguage || ""}
                onChange={(e) =>
                  setProfile({ ...profile, learningLanguage: e.target.value })
                }
                placeholder="Learning language"
              />
            ):(
              <p>{profile.learningLanguage || "No language added yet."}</p>
            )}
          </div>

          <div className="my-profile-info-card">
            <h3>About</h3>
            {isEditing ? (
              <textarea
                value={profile.about || ""}
              onChange={(e) =>
                setProfile({ ...profile, about: e.target.value })
              }
              placeholder="Write something about yourself"
              rows="5"
            />
          ) : (
            <p>{profile.about || "No about section added yet."}</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}