// homepage after successful login

// IMPORTS ______________________________________________
import { useEffect, useMemo, useState } from "react";
import {getPotentialMatches, likeMatch, passMatch} from "../api/matching.js";

//COMPONENT FUNCTION _____________________________________
export default function Home() {
  // temporary username until backend profile/user endpoint exists
  const username = useMemo(() => {
    return localStorage.getItem("username") || "User";
  }, []);

  // state for backend-loaded matches
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // load possible matches from backend
  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        setError("");

        const data = await getPotentialMatches();
        console.log("Loaded matches:", data);
        const safeMatches = Array.isArray(data) ? data : [];

        setMatches(safeMatches);
        setCurrentIndex(0);
      } catch (err) {
        setError("Failed to load matches.");
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  // current card being shown
  const currentMatch = matches[currentIndex];

  // move backward manually
  function handlePrevious() {
    if (matches.length === 0 || actionLoading) return;

    setCurrentIndex((prev) => {
      if (prev === 0) return matches.length - 1;
      return prev - 1;
    });
  }

  // move forward manually
  function handleNext() {
    if (matches.length === 0 || actionLoading) return;

    setCurrentIndex((prev) => {
      if (prev === matches.length - 1) return 0;
      return prev + 1;
    });
  }

  // remove current card after like/pass
  function removeCurrentMatch() {
    setMatches((prevMatches) => {
      if (prevMatches.length === 0) return prevMatches;

      const updatedMatches = prevMatches.filter(
        (_, index) => index !== currentIndex
      );

      if (updatedMatches.length === 0) {
        setCurrentIndex(0);
        return updatedMatches;
      }

      if (currentIndex >= updatedMatches.length) {
        setCurrentIndex(updatedMatches.length - 1);
      }

      return updatedMatches;
    });
  }

  // like action
  async function handleLike() {
    if (!currentMatch || actionLoading) return;

    try {
      setActionLoading(true);
      setError("");

      await likeMatch(currentMatch.id);
      removeCurrentMatch();
    } catch (err) {
      setError("Failed to like user.");
    } finally {
      setActionLoading(false);
    }
  }

  // pass action
  async function handlePass() {
    if (!currentMatch || actionLoading) return;

    try {
      setActionLoading(true);
      setError("");

      await passMatch(currentMatch.id);
      removeCurrentMatch();
    } catch (err) {
      setError("Failed to pass user.");
    } finally {
      setActionLoading(false);
    }
  }

  // fallback image if backend gives nothing
  const profileImage =
    currentMatch?.profileImage ||
    "https://via.placeholder.com/320x360.png?text=Profile+Image";

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="home-page">
      {/* welcome message with username */}
      <div className="home-header">
        <h1>Welcome back, {username}</h1>
      </div>

      {/* Main Swipe Section */}
      <div className="home-main">
        <button
          className="arrow-btn"
          onClick={handlePrevious}
          disabled={loading || matches.length === 0 || actionLoading}
        >
          ⬅
        </button>

        {/*card container*/}
        <div className="swipe-card">
          {loading ? (
            <p className="home-status">Loading matches...</p>
          ) : error ? (
            <p className="home-error">{error}</p>
          ) : !currentMatch ? (
            <p className="home-status">No matches available right now for your current language.</p>
          ) : (
            <>
              {/* image box */}
              <div className="swipe-image-box">
                <img
                  src={profileImage}
                  alt={`profile of ${currentMatch.username || "user"}`}
                  className="swipe-image"
                />
              </div>

              {/* card info */}
              {/* card info */}
            <div className="swipe-info">
              {currentMatch.username || "Unknown User"}
            </div>

            <div className="swipe-info">
              Name: {currentMatch.firstName} {currentMatch.lastName}
            </div>

            <div className="swipe-info">
              Language: {currentMatch.learningLanguage || "Not set"}
            </div>

            <div className="swipe-info">
              Email: {currentMatch.email || "Not available"}
            </div>

              {/* action buttons */}
              <div className="swipe-actions">
                <button
                  className="pass-btn"
                  onClick={handlePass}
                  disabled={actionLoading}
                  type="button"
                >
                  {actionLoading ? "Working..." : "Pass"}
                </button>

                <button
                  className="like-btn"
                  onClick={handleLike}
                  disabled={actionLoading}
                  type="button"
                >
                  {actionLoading ? "Working..." : "Like"}
                </button>
              </div>
            </>
          )}
        </div>

        <button
          className="arrow-btn"
          onClick={handleNext}
          disabled={loading || matches.length === 0 || actionLoading}
        >
          ➡
        </button>
      </div>
    </div>
  );
}