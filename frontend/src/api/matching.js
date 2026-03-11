import { apiRequest } from "./api.js";


//get other userss
export async function getPotentialMatches() {
  return await apiRequest("/api/users/browse", "GET");
}

//like anothe ruser
export async function likeMatch(userId) {
  return await apiRequest(`/api/match/connect/${userId}`, "POST");
}

//future stuffff
export async function passMatch(userId) {
  return true;
}