import axios from "axios";
import toast from "react-hot-toast";
import { LStorage } from "../config/constants";

export const api = axios.create({
  responseType: "json",
});

api.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      languageId: localStorage.getItem(LStorage.LANG) || "",
      Authorization: localStorage.getItem(LStorage.AUTH) || "",
    };
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (err) => {
    if (err.response.status === 401) {
      // localStorage.removeItem(LStorage.AUTH);
      // window.location.href = "/login";
    }
    return new Promise(async (_, reject) => {
      if (err?.response?.data?.error?.message) {
        toast.error(
          `${err.response?.data?.error?.code}: ${err.response?.data?.error?.message}`
        );
      } else {
        toast.error("SMT Went Wrong");
      }
      return reject(err);
    });
  }
);