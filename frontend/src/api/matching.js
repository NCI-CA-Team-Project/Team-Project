import { apiRequest } from "./api.js";

// get users availabl
export async function getPotentialMatches() {
  return apiRequest("/matches", "GET");
}

// send likes
export async function likeMatch(userId) {
  return apiRequest("/matches/like", "POST", { userId });
}

// send passes
export async function passMatch(userId) {
  return apiRequest("/matches/pass", "POST", { userId });
}