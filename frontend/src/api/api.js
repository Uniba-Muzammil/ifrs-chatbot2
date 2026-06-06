import axios from "axios";

const API = axios.create({
  baseURL: "https://ifrs-chatbot2-production.up.railway.app/api",
  withCredentials: true,
});


// Auth
export const registerUser = (data) =>
  API.post("/accounts/register/", data);

export const loginUser = (data) =>
  API.post("/accounts/login/", data);

export const getProfile = () =>
  API.get("/accounts/profile/");

export const logoutUser = () =>
  API.post("/accounts/logout/");


// Chat
export const askChat = (data) =>
  API.post("/chat/ask/", data);
export const getChatHistory = () =>
  API.get("/chat/history/");

// Billing
export const getPlans = () =>
  API.get("/billing/plans/");

export const checkout = (data) =>
  API.post("/billing/checkout/", data);

