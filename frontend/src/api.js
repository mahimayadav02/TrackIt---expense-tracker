import axios from "axios";

const api = axios.create({
  baseURL: "https://trackit-expense-tracker-production-d620.up.railway.app"
});

export default api;