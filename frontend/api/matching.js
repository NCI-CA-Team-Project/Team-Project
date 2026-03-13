import { apiRequest } from "./api.js";

// browse users to swipe/match
export async function getPotentialMatches() {
  return await apiRequest("/api/users/browse", "GET");
}

// connect/like a user
export async function likeMatch(userId) {
  return await apiRequest(`/api/match/connect/${userId}`, "POST");
}

// get matched users
export async function getMyMatches() {
  return await apiRequest("/api/match/my-matches", "GET");
}

// placeholder until backend has a pass endpoint
export async function passMatch(userId) {
  return true;
}