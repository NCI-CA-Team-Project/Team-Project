// single chat conversation page
// loads message history from backend and lets user send a new message


//IMPORTS___________________________________________
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/api.js";


//COMPONENT FUNCTION _____________________________________
export default function Chat() {


//HOOKS / STATE SETUP _____________________________________
  const { conversationId } = useParams(); // gets conversation id from the url eg /chat/5

  const [messages, setMessages] = useState([]); // stores messages loaded from backend
  const [newMessage, setNewMessage] = useState(""); // stores current input value

  const [loading, setLoading] = useState(true); // loading state while messages are being fetched
  const [sending, setSending] = useState(false); // sending state while posting new message
  const [error, setError] = useState(""); // stores backend or network errors


//HELPER FUNCTIONS AND HANDLERS _____________________________________

  // load existing messages for this conversation
  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");

      // expected backend endpoint example:
      // GET /conversations/{conversationId}/messages
      const data = await apiRequest(`/conversations/${conversationId}/messages`, "GET");

      // backend should return an array of message objects
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
    if (!conversationId) {
      setError("No conversation selected.");
      setLoading(false);
      return;
    }

    loadMessages();
  }, [conversationId]);


  // send a new message to backend
  const handleSend = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      setSending(true);
      setError("");

      const payload = {
        text: newMessage.trim(),
      };

      // expected backend endpoint example:
      // POST /conversations/{conversationId}/messages
      const createdMessage = await apiRequest(
        `/conversations/${conversationId}/messages`,
        "POST",
        payload
      );

      // if backend returns the newly created message, append it to screen immediately
      if (createdMessage) {
        setMessages((prev) => [...prev, createdMessage]);
      } else {
        // fallback: reload messages if backend does not return created message
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

      {/* chat page header */}
      <div className="chat-header">
        <h1>Chat</h1>
        <p>Conversation ID: {conversationId}</p>
      </div>

      {/* error message */}
      {error && <p className="chat-error">{error}</p>}

      {/* messages area */}
      <div className="chat-messages">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "me" || message.sentByCurrentUser
                  ? "chat-bubble mine"
                  : "chat-bubble theirs"
              }
            >
              <p>{message.text}</p>
              <span>{message.time || message.createdAt || ""}</span>
            </div>
          ))
        )}
      </div>

      {/* send message form */}
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