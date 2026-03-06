// login, register, token storage, logout and auth checks

import { apiRequestForm, apiRequest } from "./api.js";


//LOGINNNNNNNNNNNNNNNN
export async function login(id, password) {
  if (!id?.trim() || !password) return false;

  try {
    const text = await apiRequestForm("/login", "POST", {
      id: id.trim(),
      password,
    });

    if (text.includes("Login Success")) {
      // temporary fake session until backend returns a real JWT
      localStorage.setItem("token", "temp-session");
      return true;
    }

    return false;
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
}

export async function loginJwt(id, password) {
  if (!id?.trim() || !password) return false;

  try {
    const data = await apiRequest("/auth/login", "POST", {
      id: id.trim(),
      password,
    });

    if (!data?.token) return false;

    localStorage.setItem("token", data.token);
    return true;
  } catch (err) {
    console.error("JWT login failed:", err);
    return false;
  }
}


//REGISTERRRRRRRRR
export async function register() {
  console.warn("Register not working");
  return false;
}



export async function registerJwt(payload) {
  try {
    const data = await apiRequest("/auth/register", "POST", payload);

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