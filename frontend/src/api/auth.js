// login, register, token storage, logout and auth checks

import { apiRequestForm, apiRequest } from "./api.js";


//LOGINNNNNNNNNNNNNNNN
export async function login(username, password) {
  if (!username?.trim() || !password) return false;

  try {
    const token = await apiRequest("/api/auth/signin", "POST", {
      userName: username.trim(),
      password,
    });

    if (!token) return false;

    // temporary fake session until backend returns a real JWT
    localStorage.setItem("token", token);
    localStorage.setItem("username", username.trim());
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
}

export async function loginJwt(username, password) {
  if (!username?.trim() || !password) return false;

  try {
    const token = await apiRequest("/api/auth/signin", "POST", {
      userName: username.trim(),
      password,
    });

    if (!token) return false;

    localStorage.setItem("token", token);
    localStorage.setItem("username", username.trim());
    return true;
  } catch (err) {
    console.error("JWT login failed:", err);
    return false;
  }
}


//REGISTERRRRRRRRR
export async function register(payload) {
  try {
    const data = await apiRequest("/api/auth/register", "POST", payload);
    return data;
  } catch (err) {
    console.error("Register failed:", err);
    return false;
  }
}



export async function registerJwt(payload) {
  try {
    const data = await apiRequest("/api/auth/register", "POST", payload);
    return data;
  } catch (err) {
    console.error("JWT register failed:", err);
    return false;
  }
}


//LOGOUTTTTTTTTTTT
export async function logout() {
  try {
    await apiRequest("/api/auth/logout", "POST");
  } catch (err) {
    console.error("Logout request failed:", err);
  }

  localStorage.removeItem("token");
  localStorage.removeItem("username");
}


//AUTHHHH CHECKKK 

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}