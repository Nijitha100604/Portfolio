import axios from "axios";

// Long timeout: a free Render server can take up to a minute to wake up.
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

export default client;
