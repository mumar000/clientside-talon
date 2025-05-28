import axios from "axios";
import { logout } from "../store/features/authSlice";
import store from "../store/store";

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_LOCAL_URL
  : import.meta.env.VITE_DEPLOYED_URL;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Axios interceptor caught error:", error.response?.status);
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
