import { useState, useEffect } from "react";
import { apiRequest } from "../api/api.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

 useEffect(() => {
  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/api/users/me", "GET");
      setProfile(data);
      localStorage.setItem("user", JSON.stringify(data));
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
  try {
    setLoading(true);
    setError("");

    const updatedProfile = await apiRequest("/api/users/me", "PUT", {
      firstName: profile.firstName,
      lastName: profile.lastName,
      learningLanguage: profile.learningLanguage,
      about: profile.about,
      profileImage: profile.profileImage,
    });

    setProfile(updatedProfile);
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    localStorage.setItem("username", updatedProfile.username);
    setIsEditing(false);
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
        {error && <p className="profile-error">{error}</p>}
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