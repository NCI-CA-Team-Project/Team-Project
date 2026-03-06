import { apiRequest } from "./api.js";

// get all conversation previews for inbox
export async function getConversations() {
  return apiRequest("/messages", "GET");
}

// get one conversation's full chat messages
export async function getConversationById(conversationId) {
  return apiRequest(`/messages/${conversationId}`, "GET");
}

// mark a conversation as read
export async function markConversationAsRead(conversationId) {
  return apiRequest(`/messages/${conversationId}/read`, "PUT");
}

// send a new message in a conversation
export async function sendMessage(conversationId, content) {
  return apiRequest(`/messages/${conversationId}`, "POST", { content });
}