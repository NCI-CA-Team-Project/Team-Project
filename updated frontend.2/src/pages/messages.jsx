// messages inbox page showing conversation previews

//IMPORTS___________________________________________
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { useEffect } from "react";
import { getConversations } from "../api/messages.js";
import { getMyMatches } from "../api/matching.js";


//COMPONENT FUNCTION _____________________________________
export default function Messages() {

  //HOOKS / STATE SETUP _____________________________________
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("chats");//controls which tab on the message page the user is in firends or chats

  const [conversations, setConversations] = useState([]);//stores converation preveiws and matched users from the backend 
  const [friends, setFriends] = useState([]);

  const [loading, setLoading] = useState(true);//tracks loading and error states while fetching 
  const [error, setError] = useState("");


  useEffect(() => {
    async function loadData() {//loads matcches and conversations from backend when page opens
      try {
        setLoading(true);
        setError("");

        const conversationData = await getConversations();//requests convos and friends
        const friendsData = await getMyMatches();

        const safeConversations = Array.isArray(conversationData) ? conversationData : [];
        const safeFriends = Array.isArray(friendsData) ? friendsData : [];


        setConversations(safeConversations);
        setFriends(safeFriends);
      } catch (err) {
        setError("Failed to load messages.");
        setConversations([]);
        setFriends([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  


  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  const displayedItems = activeFilter === "friends" ? friends : conversations;//switches between chats and friends list
  

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="messages-page">
      <div className="messages-top">
        <h1>Chats</h1>
      </div>

      {/*lets user switches between chat and firends*/}
      <div className="messages-filters">
        <button
          className={activeFilter === "chats" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("chats")}
          type="button"
        >
          Chats
        </button>


        <button
          className={activeFilter === "friends" ? "filter-btn active" : "filter-btn"}
          onClick={() => setActiveFilter("friends")}
          type="button"
        >
          Friends
        </button>

      </div>

      {/*list of chats/matches*/}
      <div className="messages-list">
        {loading ? (
          <div className="no-messages">Loading chats...</div>
        ) : error ? (
          <div className="no-messages">{error}</div>
        ) : displayedItems.length > 0 ? (
          displayedItems.map((item) => {
            {/*changes the display list depending on what tab the user has open */}
            const isFriendTab = activeFilter === "friends";

            const userId = isFriendTab ? item.id : item.otherUserId;
            const displayName = item.username || "Unknown User";
            const previewText = isFriendTab ? "Matched user" : item.lastMessage || "No messages yet";
            const displayTime = isFriendTab ? "" : item.messageTime || "";

            return (
            <div
              key={userId}
              className="message-row"
              onClick={() => navigate(`/chat/${userId}`)}
            >
              {/*avator placeholder of user initial*/}
              <div className="message-avatar">
                {(displayName || "U").charAt(0)}
              </div>

              {/*message preveiw and name*/}
              <div className="message-main">
                <div className="message-name">{displayName}</div>
                <div className="message-preview">{previewText}
                </div>
              </div>

              <div className="message-time">{displayTime}</div>
            </div>
          );
          })
        ) : (
          <div className="no-messages">No chats found.</div>
        )}
      </div>
    </div>
  );
}