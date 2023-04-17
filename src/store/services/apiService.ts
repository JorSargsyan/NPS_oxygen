import axios from "axios";
import toast from "react-hot-toast";
import { LStorage } from "../config/constants";

export const api = axios.create({
  responseType: "json",
});

const feedbackExceptionUrl = "/Feedback/Status/";
const adminUrl = "/admin";

api.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      // languageId: localStorage.getItem(LStorage.LANG) || "",
      languageId: "2",
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
      if (
        err.response?.config?.url.includes(feedbackExceptionUrl) ||
        !err.response?.config?.url.includes(adminUrl)
      ) {
        return reject(err);
      }
      if (err?.response?.data?.error?.message) {
        toast.error(
          `${err.response?.data?.error?.code}: ${err.response?.data?.error?.message}`
        );
        reject(err);
      } else {
        toast.error("SMT Went Wrong");
        reject(err);
      }
    });
  }
);
