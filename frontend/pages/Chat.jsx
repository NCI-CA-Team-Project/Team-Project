// single chat conversation page
// loads message history from backend and lets user send a new message

//IMPORTS___________________________________________
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/api.js";

//COMPONENT FUNCTION _____________________________________
export default function Chat() {

  //HOOKS / STATE SETUP _____________________________________
  const { id } = useParams(); // route is /chat/:id so grab id
  const otherUserId = id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  //HELPER FUNCTIONS AND HANDLERS _____________________________________
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      // get conversation with selected user
      const data = await apiRequest(`/api/messages/${otherUserId}`, "GET");
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setError("Could not load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!otherUserId) {
      setError("No chat selected.");
      setLoading(false);
      return;
    }

    loadMessages();
  }, [otherUserId]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      setSending(true);
      setError("");

      const payload = {
        messageContent: newMessage.trim(),
      };

      const createdMessage = await apiRequest(
        `/api/messages/send/${otherUserId}`,
        "POST",
        payload
      );

      if (createdMessage) {
        setMessages((prev) => [...prev, createdMessage]);
      } else {
        await loadMessages();
      }

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

      <div className="chat-messages">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="chat-bubble theirs"
            >
              <p>{message.messageContent}</p>
              <span>
                {message.messageTime
                  ? new Date(message.messageTime).toLocaleString()
                  : ""}
              </span>
            </div>
          ))
        )}
      </div>

      <form className="chat-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button type="submit" disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}