
// login, register, token storage, logout and auth checks

import { apiRequestForm, apiRequest } from "./api.js"; // only importing rrequest form bacuse martins backend currently anyway expects form urlencoded


// export async function loginJwt(username, password) {
//   const data = await apiRequest("/auth/login", "POST", { username, password });
//   if (!data?.token) return false;
//   localStorage.setItem("token", data.token);
//   return true;
// }

export async function loginJwt(id, password) { //takes two inputsand awaits for backend to respond with success
  const data = await apiRequest("/auth/login", "POST", { username, password });
  try {//try login request
    const text = await apiRequestForm("/login", "POST", { //this calls on our helper function by sending a post request to backend login 
      id: id.trim(), //sends form urlencoded
      password,
    });

    if (text.includes("Login Success")) { //if the backend returns a sucess message we set a token in the browser, this isnt real security its just the for nwo 
      localStorage.setItem("token", "temp-session");
      return true;
    }

    return false; //if a failure is returned 
  } catch (err) {
    console.error("Login failed:", err);
    return false;
  }
}
  

/**
 * REGISTER:
 * register only returns false cuz i dont have endpoint for it yet
 * so this is basically just a placeholder 
 */
export async function register() {
  console.warn("Register not working endpoint in backend is missing ");
  return false;
}


// this is how we will do register an dlogin later on when we have jwt implemented on backend 

// export async function loginJwt(username, password) {
//   const data = await apiRequest("/auth/login", "POST", { username, password });
//   if (!data?.token) return false;
//   localStorage.setItem("token", data.token);
//   return true;
// }
//
// export async function registerJwt(payload) {
//   const data = await apiRequest("/auth/register", "POST", payload);
//   if (!data?.token) return false;
//   localStorage.setItem("token", data.token);
//   return true;
// }

export function logout() { //logout i ssimple we just get rid of their token 
  localStorage.removeItem("token");
}

export function isAuthenticated() { //this is temporary auth check so only users with a token can go to other pages 
  return !!localStorage.getItem("token");
}
