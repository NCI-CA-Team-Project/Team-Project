import { useEffect, useState } from "react";

//COMPONENT FUNCTION _____________________________________
export default function Pay() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() =>{
    document.title = "Requests";
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/match/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load requests");
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/match/accept/${requestId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/match/decline/${requestId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to decline request");
      }

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return(
    <div style={{ padding: 20 }}>
      <h1>Requests</h1>
      <p>Incoming match requests will be shown here.</p>

      {loading && <p>Loading requests...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <p>No pending requests.</p>
      )}

    {!loading && !error && requests.length > 0 && (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px" }}>
        {requests.map((request) => (
          <div
            key={request.id}
           style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#111",
            border: "1px solid #2a2a2a",
            borderRadius: "16px",
            padding: "16px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <img
              src={
                request.profileImage && request.profileImage.trim() !== ""
                  ? `http://localhost:8080${request.profileImage}`
                  : "/default-avatar.png"
              }
              alt=""
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/default-avatar.png";
              }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #2f2f2f",
                backgroundColor: "#1a1a1a",
                display: "block"
              }}
            />

            <div>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#fff" }}>
                {request.firstName && request.lastName
                  ? `${request.firstName} ${request.lastName}`
                  : request.username || `User ${request.userId}`}
              </p>
              <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#aaa" }}>
                Sent you a match request
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleAccept(request.id)}
              style={{
                backgroundColor: "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Accept
            </button>

            <button
              onClick={() => handleDecline(request.id)}
              style={{
                backgroundColor: "#1f1f1f",
                color: "#fff",
                border: "1px solid #3a3a3a",
                borderRadius: "10px",
                padding: "10px 18px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
  </div>
  );
}