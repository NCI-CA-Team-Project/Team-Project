// api calling backend for login register and auth token management(storing to remember your logged in ), logout)
// auth.js
//
// This file uses apiRequest() from api.js so all requests share: - BASE_URL from VITE_API_URL
// - JSON body handling
// - Authorization header when token exists aka shows authorised token at each request
//token is valid until log out or localStorage cleared

import { apiRequest } from "./api";

// this will be fipped to flase once connected to backend this is just a bypass so i could test 
const USE_TEMP_BYPASS = true;

/**
 * Login a user.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>} true if login worked, false otherwise
 */
export async function login(username, password) {
  // Basic input guard: if missing fields, fail fast.
  if (!username || !password) return false;

  // TEMP BYPASS: lets you build UI before backend
  if (USE_TEMP_BYPASS) {
    localStorage.setItem("token", "fake-token");
    return true;
  }

  try {
    // Calls backend for login using apiRequest: POST(aka send ) /auth/login with JSON body : username, password 
    const data = await apiRequest("/auth/login", "POST", { username, password });

    // Expect backend to return missing token data 
    if (!data?.token) return false;

    // Store token so future requests can include auth header
    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    // apiRequest throws error like 401 so errror message is sent 
    console.error("Login failed:", err);
    return false;
  }
}

/**
 * Register a user.
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @returns {Promise<boolean>} true if register worked, false otherwise
 */
export async function register(email, username, password) {
  //checks for missing field 
  if (!email || !username || !password) return false;

  // fake token for testing 
  if (USE_TEMP_BYPASS) {
    localStorage.setItem("token", "fake-token");
    return true;
  }

  try {
    // Calls backend: sends(POST) json username, email, pword so it can create accouunt 
    const data = await apiRequest("/auth/register", "POST", {
      email,
      username,
      password,
    });

    // Expect backend to return missing token data
    if (!data?.token) return false;

    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    console.error("Register failed:", err);
    return false;
  }
}

/**
 * Logs user out by deleting token.
 */
export function logout() {
  localStorage.removeItem("token");
}

/**
 * Checks if a token exists.
 * NOTE: This does NOT verify the token is valid. It only checks it's present.
 * @returns {boolean}
 */
export function isAuthenticated() {
  // !! converts a truthy string to true, null to false
  return !!localStorage.getItem("token");
}