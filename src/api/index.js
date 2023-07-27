import axios from "axios";
const API = axios.create({ baseURL: "https://newsappserver.onrender.com" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/api/auth/login", authData);
export const signUp = (authData) => API.post("/api/auth/register", authData);
export const forgotPassword = ({ email }) =>
  API.post("/api/auth/forgot-password", { email });
export const resetPassword = ({ password, token }) =>
  API.patch(`/api/auth/reset-password/${token}`, { password });

export const saveNews = (
  userId,
  newsUrl,
  newsImage,
  newsTitle,
  newsDescription
) =>
  API.patch(`/api/user/save/${userId}`, {
    newsUrl,
    newsImage,
    newsTitle,
    newsDescription,
  });
export const fetchSavedNews = (userId) => API.get(`/api/user/fetch/${userId}`);
export const deleteNews = (userId, newsId) =>
  API.patch(`/api/user/delete/${userId}`, { newsId });
export const saveKeyword = (userId, keyword) =>
  API.patch(`/api/user/keyword/${userId}`, { keyword });
export const fetchKeywords = (userId) =>
  API.get(`/api/user/fetchkeyword/${userId}`);
export const visitNews = (
  userId,
  newsUrl,
  newsImage,
  newsTitle,
  newsDescription
) =>
  API.patch(`/api/user/visit/${userId}`, {
    newsUrl,
    newsImage,
    newsTitle,
    newsDescription,
  });
export const fetchRecentVisits = (userId) =>
  API.get(`/api/user/fetchvisits/${userId}`);
export const removeNews = (userId, newsId) =>
  API.patch(`/api/user/remove/${userId}`, { newsId });
