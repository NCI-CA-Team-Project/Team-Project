// single chat conversation page
// loads message history from backend and lets user send a new message

//IMPORTS___________________________________________
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationById, sendMessage } from "../api/messages.js";

//COMPONENT FUNCTION _____________________________________
export default function Chat() {
  //HOOKS / STATE SETUP _____________________________________
  const { id } = useParams();
  const otherUserId = Number(id);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  //HELPER FUNCTIONS AND HANDLERS _____________________________________

  // load existing messages for this conversation
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getConversationById(otherUserId);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Could not load messages.");
    } finally {
      setLoading(false);
    }
  };

  // run once when page opens or when conversation id changes
  useEffect(() => {
    if (!otherUserId) {
      setError("No conversation selected.");
      setLoading(false);
      return;
    }

    loadMessages();
  }, [otherUserId]);

  // send a new message to backend
  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      setSending(true);
      setError("");

      await sendMessage(otherUserId, newMessage.trim());
      await loadMessages();
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Could not send message.");
    } finally {
      setSending(false);
    }
  };

  //RETURN JSX AKA UI________________________________________
  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>Chat</h1>
        <p>User ID: {otherUserId}</p>
      </div>

      {error && <p className="chat-error">{error}</p>}

      <div className="chat-body">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.senderId === Number(localStorage.getItem("userId"))
                  ? "chat-bubble mine"
                  : "chat-bubble theirs"
              }
            >
              <p>{message.messageContent}</p>
              <span>{message.messageTime || ""}</span>
            </div>
          ))
        )}
      </div>

      <form className="chat-input-bar" onSubmit={handleSend}>
        <input
          className = "chat-input"
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button className = "chat-send-btn" type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}