// login, register, token storage, logout and auth checks

import { apiRequestForm, apiRequest } from "./api.js";


//LOGINNNNNNNNNNNNNNNN
export async function login(username, password) {
  if (!username?.trim() || !password) return false;

  try {
    const data = await apiRequest("/api/auth/signin", "POST", {
      username: username.trim(),
      password,
    });

    if (!data?.token) {
      console.error("no JWT returned from backend");
      return false;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username.trim());

    return true;
  } catch (err) {
    console.error("login failed:", err);
    return false;
  }
}

//REGISTERRRRRRRRR
export async function register(payload) {
  try {
    const data = await apiRequest("/api/auth/signup", "POST", payload);
    return data;
  } catch (err) {
    console.error("Register failed:", err);
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