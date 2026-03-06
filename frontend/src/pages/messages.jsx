// messages inbox page showing conversation previews

//IMPORTS___________________________________________
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useEffect } from "react";
import { getConversations } from "../api/messages.js";


//COMPONENT FUNCTION _____________________________________
export default function Messages() {

  //HOOKS / STATE SETUP _____________________________________
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("read");



  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadConversations() {
      try {
        setLoading(true);
        setError("");

        const data = await getConversations();
        const safeConversations = Array.isArray(data) ? data : [];

        setConversations(safeConversations);
      } catch (err) {
        setError("Failed to load messages.");
        setConversations([]);
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);


  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  const filteredConversations = conversations.filter((chat) => {
    const matchesFilter =
      activeFilter === "read"
        ? chat.read
        : activeFilter === "unread"
        ? !chat.read
        : activeFilter === "friends"
        ? chat.friend
        : activeFilter === "starred"
        ? chat.starred
        : true;

    return matchesFilter;
  });

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="messages-page">
      <div className="messages-top">
        <h1>Chats</h1>
      </div>

      <div className="messages-filters">
        <button
          className={activeFilter === "read" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("read")}
          type="button"
        >
          read
        </button>

        <button
          className={activeFilter === "unread" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("unread")}
          type="button"
        >
          unread
        </button>

        <button
          className={activeFilter === "friends" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("friends")}
          type="button"
        >
          friends
        </button>

        <button
          className={activeFilter === "starred" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("starred")}
          type="button"
        >
          starred
        </button>
      </div>

      <div className="messages-list">
        {loading ? (
          <div className="no-messages">Loading chats...</div>
        ) : error ? (
          <div className="no-messages">{error}</div>
        ) : filteredConversations.length > 0 ? (
          filteredConversations.map((chat) => (
            <div
              key={chat.id}
              className="message-row"
              onClick={() => navigate(`/chat/${chat.id}`)}
            >
              <div className="message-avatar">
                {(chat.name || "U").charAt(0)}
              </div>

              <div className="message-main">
                <div className="message-name">{chat.name || "Unknown User"}</div>
                <div className="message-preview">
                  {chat.message || "No messages yet"}
                </div>
              </div>

              <div className="message-time">{chat.time || ""}</div>
            </div>
          ))
        ) : (
          <div className="no-messages">No chats found.</div>
        )}
      </div>
    </div>
  );
}