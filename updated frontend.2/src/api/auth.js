// login, register, token storage, logout and auth checks

import { apiRequestForm, apiRequest } from "./api.js";


//LOGIN
//sends the user inputs to backend
export async function login(username, password) {
  if (!username?.trim() || !password) return false;

  try {
    //sends login reques to backend
    const data = await apiRequest("/api/auth/signin", "POST", {
      username: username.trim(),
      password,
    });

    if (!data?.token) return false;//login fails if a token is not retunred

    // if login is sucessful these are stored in local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("username", data.user.username);
    return true;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
}




//REGISTERR
//creates new account with signup endpoint
export async function register(payload) {
  try {
    //send usewr inputs to backend
    const data = await apiRequest("/api/auth/signup", "POST", payload);
    
    //returns the response from backend if registration is successful
    return { ok: true, data };
  } catch (err) {
    console.error("Register failed:", err);
    return { ok: false, error: err.message };
  }
}


//JWT REGISTER
//alt function if backend returns token directly
export async function registerJwt(payload) {
  try {
    const data = await apiRequest("/api/auth/register", "POST", payload);
    //if no token comes bcak the registration is a fail
    if (!data?.token) return false;
    //saves token in local storage
    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    console.error("JWT register failed:", err);
    return false;
  }
}


//LOGOUTTTTTTTTTTT
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}


//AUTHHHH CHECKKK 

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}