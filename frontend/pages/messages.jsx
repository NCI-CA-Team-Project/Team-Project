// messages page showing users you have already matched with

//IMPORTS___________________________________________
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyMatches } from "../api/matching.js";

//COMPONENT FUNCTION _____________________________________
export default function Messages() {
  //HOOKS / STATE SETUP _____________________________________
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        setError("");

        const data = await getMyMatches();
        const safeMatches = Array.isArray(data) ? data : [];
        setMatches(safeMatches);
      } catch (err) {
        console.error("Failed to load matches:", err);
        setError("Failed to load matches.");
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, []);

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="messages-page">
      <div className="messages-top">
        <h1>Chats</h1>
      </div>

      <div className="messages-list">
        {loading ? (
          <div className="no-messages">Loading chats...</div>
        ) : error ? (
          <div className="no-messages">{error}</div>
        ) : matches.length > 0 ? (
          matches.map((user) => (
            <div
              key={user.id}
              className="message-row"
              onClick={() => navigate(`/chat/${user.id}`)}
            >
              <div className="message-avatar">
                {(user.username || user.name || "U").charAt(0).toUpperCase()}
              </div>

              <div className="message-main">
                <div className="message-name">
                  {user.username || user.name || `User ${user.id}`}
                </div>
                <div className="message-preview">
                  Open chat
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-messages">No matches yet.</div>
        )}
      </div>
    </div>
  );
}