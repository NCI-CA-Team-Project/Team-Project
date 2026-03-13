// base api helper fetch request, backend url, auth token

const BASE_URL = import.meta.env.VITE_API_URL;

// JSON helper endpoints that accept JSON and return JSON
export async function apiRequest(endpoint, method = "GET", body = null) { // this function runs a fetch request to backend with given endpoint methods
  const token = localStorage.getItem("token");//this gets token from local storage and adds it to header of request because we need it for protected routes later with jwt

  const headers = { //thi sis the meta data for the request ie content type and auth token
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // if body is a normal object we send json
  if (body !== null && typeof body !== "string") {
    headers["Content-Type"] = "application/json";
  }

  // if body is plain text we send plain text
  if (body !== null && typeof body === "string") {
    headers["Content-Type"] = "text/plain";
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, { // this sends the request to backend with the endpoint, await means we need bakend to respond before continuing
    method, //method is a type of request like gte,post,put,delete
    headers,
    body:
      body === null
        ? null
        : typeof body === "string"
        ? body
        : JSON.stringify(body),//if bosy isnt null its converted to json string if it is null then statys null
  });

  if (!res.ok) {
    const msg = await safeReadText(res);
    throw new Error(msg || `Error: ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}

// Text helper endpoints that return plain text
export async function apiRequestText(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  if (body !== null && typeof body !== "string") {
    headers["Content-Type"] = "application/json";
  }

  if (body !== null && typeof body === "string") {
    headers["Content-Type"] = "text/plain";
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body:
      body === null
        ? null
        : typeof body === "string"
        ? body
        : JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await safeReadText(res);
    throw new Error(msg || `Error: ${res.status}`);
  }

  return res.text();
}

// Form helper endpoints that expect x-www-form-urlencoded and may return text
export async function apiRequestForm(endpoint, method = "POST", formObject = {}) {
  const token = localStorage.getItem("token");

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(formObject)) {
    params.append(k, v);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const msg = await safeReadText(res);
    throw new Error(msg || `Error: ${res.status}`);
  }

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}

async function safeReadText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}