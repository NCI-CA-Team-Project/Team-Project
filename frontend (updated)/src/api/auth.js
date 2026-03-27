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

    if (!data?.token) return false;

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




//REGISTERRRRRRRRR
export async function register(payload) {
  try {
    const data = await apiRequest("/api/auth/signup", "POST", payload);
    return { ok: true, data };
  } catch (err) {
    console.error("Register failed:", err);
    return { ok: false, error: err.message };
  }
}



export async function registerJwt(payload) {
  try {
    const data = await apiRequest("/api/auth/register", "POST", payload);

    if (!data?.token) return false;

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