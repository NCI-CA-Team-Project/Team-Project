// base api helper for reuse in all files i call on apirequest (fetch request, backend url, auth token )

const BASE_URL = import.meta.env.VITE_API_URL; // this reads the backend url from an environment variable, allows us to easily switch between dev and prod backends without hardcoding


//api request helper for backend , centralises all http requests so we dont have to repeat over and over
export async function apiRequest(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token"); // gets the auth user token for protected routes

  const response = await fetch(`${BASE_URL}${endpoint}`, { //makes a http request to backend using fetch api 
    method,     //method is the http method (GET POST etc) default is GET but can be overridden when calling apiRequest
    headers: {
      "Content-Type": "application/json", //tells backend we are sending json data
      ...(token && { Authorization: `Bearer ${token}` }), //including token 
    },
    body: body ? JSON.stringify(body) : null,
  });

  //if backend returns arror like 401 or something we throw an error so we can handle it in the frontend ui
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json(); 
}