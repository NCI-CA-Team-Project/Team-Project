import { apiRequest, apiRequestText } from "./api.js";

// get users availabl
export async function getPotentialMatches() {
  return apiRequest("/api/users/browse", "GET");
}


// send likes
export async function likeMatch(userId) {
  return apiRequestText(`/api/match/connect/${userId}`, "POST");
}

// send passes
export async function passMatch(userId) {
  return Promise.resolve();
}

//get matches that the user has already made
export async function getMyMatches() {
  return apiRequest("/api/match/my-matches", "GET");
}