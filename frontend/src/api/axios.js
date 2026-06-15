import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-complaint-management-system-app.onrender.com",
  withCredentials: true
});

export default API;