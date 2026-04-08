import { apiRequest } from "./api.js";

// get all conversation previews for inbox
export async function getConversations() {
  return apiRequest("/api/messages", "GET");
}

// get one conversation's full chat messages
export async function getConversationById(otherUserId) {
  return apiRequest(`/api/messages/${otherUserId}`, "GET");
}

// mark a conversation as read
export async function markConversationAsRead(conversationId) {
  return apiRequest(`/api/messages/${conversationId}/read`, "PUT");
}

// send a new message in a conversation
export async function sendMessage(receiverId, content) {
  return apiRequest(`/api/messages/send/${receiverId}`, "POST", { messageContent: content });
}