// profile.jsx written by cameron reused it here but edited it
// page that lets users see other user profiles

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/api.js";

export default function ViewProfile() {
  const { userId } = useParams();//gets user id from url

  const [profile, setProfile] = useState(null);//stores profile data
  const [error, setError] = useState("");//stores error messages
  const [loading, setLoading] = useState(false);//stores loading state

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);//starts laoding and clears any old errors
        setError("");

        const data = await apiRequest(`/api/users/${userId}`, "GET");//fetches profile data from backend
        setProfile(data);//
        localStorage.setItem("viewProfile", JSON.stringify(data));//stores profile data in locla storage
      } catch (err) {
        const storedProfile = localStorage.getItem("viewProfile");//if backend fails it trys using the previous profies data

        if (storedProfile) {
          setProfile(JSON.parse(storedProfile));
        } else {
          setError("Failed to load profile.");
        }
      } finally {
        setLoading(false);//stops loading state
      }
    }
    loadProfile();
  }, [userId]);

  //LOADING StATE
  if (loading && !profile) {
    return <p>Loading the profile...</p>;
  }

  //ERROR STATE
  if (error && !profile) {//error message if no profile data loaded
    return <p>{error}</p>;
  }

  //EMPTY STATE
  if (!profile) {
    return <p>No profile data found.</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-grid">
        {/* a warning if there's an error */}
        {error && <p className="profile-error">{error}</p>}

        <div className="profile-left">{/*left side is the avatar and basic info like name and username*/}
          <p className="my-profile-level">Level 1</p>

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

          <h2 className="my-profile-name">
            {profile.firstName || "Your Name"} {profile.lastName || ""}
          </h2>

          <p className="my-profile-username">
            @{profile.username || "username"}
          </p>

          <div className="profile-actions">
            <button>Add Friend</button>
          </div>
        </div>

        <div className="profile-right">{/*right side is the aboiut section and the luaguages your learning*/}
          <div className="my-profile-info-card">
            <h3>Learning Language</h3>
            <p>{profile.learningLanguage || "No language added yet."}</p>
          </div>

          <div className="my-profile-info-card">
            <h3>About</h3>
            <p>{profile.about || "No about section added yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}