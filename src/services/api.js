import axios from "axios";

const api = axios.create({
  baseURL: "https://gym-management-backend-5z0q.onrender.com/"
});

export default api;
