import { apiRequest } from "./api.js";

// get full conversation with one matched user
export async function getConversation(otherUserId) {
  if (!otherUserId) {
    throw new Error("otherUserId is required");
  }

  return await apiRequest(`/api/messages/${otherUserId}`, "GET");
}

// send a message to one matched user
export async function sendMessage(receiverId, content) {
  if (!receiverId) {
    throw new Error("receiverId is required");
  }

  if (!content?.trim()) {
    throw new Error("Message content is required");
  }

  return await apiRequest(`/api/messages/send/${receiverId}`, "POST", {
    messageContent: content.trim(),
  });
}