// homepage after successful login

// IMPORTS ______________________________________________
import { useEffect, useMemo, useState } from "react";
import {getPotentialMatches, likeMatch, passMatch} from "../api/matching.js";

//COMPONENT FUNCTION _____________________________________
export default function Home() {
  const username = useMemo(() => {//gets the stored username for the welcome message
    return localStorage.getItem("username") || "User";
  }, []);

 //widgets 
const [openWidget, setOpenWidget] = useState(null);//controls which widget is open right now
const toggleWidget = (widgetName) => {//opens a widget when clicked and closes the others
  setOpenWidget(openWidget === widgetName ? null : widgetName);
};

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

        const data = await getPotentialMatches();//requests matches
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
  const currentMatch = matches[currentIndex];//stores the current match object

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

      if (updatedMatches.length === 0) {//if no matches are left it resets the index
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



      {/* expandable widgets */}
      <div className="home-widgets">

        <button className={`home-widget-card ${openWidget === "matching" ? "open" : ""}`} onClick={() => toggleWidget("matching")}>
          <div className="home-widget-header">
            <h3>How Our Matching Works</h3>
            <span>{openWidget === "matching" ? "▲" : "▼"}</span>
          </div>
          {openWidget === "matching" && (
            <p>
              Lingo conects you with real people based on the language you are learning.
              But we also take into account your interests so you can have fun conversations to learn with 
            </p>
          )}
        </button>

        <button className={`home-widget-card ${openWidget === "lingo" ? "open" : ""}`} onClick={() => toggleWidget("lingo")}>
          <div className="home-widget-header">
            <h3>How Lingo Helps Your Learning</h3>
            <span>{openWidget === "lingo" ? "▲" : "▼"}</span>
          </div>
          {openWidget === "lingo" && (
            <p>
              Its shown that real conversations are the best way to learn a new language.
              Lingo lets you practise  to pick up slang, new words, phrasing, and most importantly condfidence in the lanuage. you are learning 
            </p>
          )}
        </button>

        <button className={`home-widget-card ${openWidget === "tip" ? "open" : ""}`}onClick={() => toggleWidget("tip")}>
          <div className="home-widget-header">
            <h3>Conversation Starter Tips</h3>
            <span>{openWidget === "tip" ? "▲" : "▼"}</span>
          </div>
          {openWidget === "tip" && (
            <p>
              Start with your interests, maybe you have some hobbies or music in common due to our interests based matching.
              And remember having a relaxed conversation with slip ups will teach you more than a perfect one.
            </p>
          )}
        </button>
      </div>


    </div>
  );
}