import { Remove } from "@mui/icons-material";
import axios from "axios";
import Router from "next/router";

const instance = axios.create({
  baseURL: "http://localhost/api/",
  timeout: 1000,
  headers: {
    Authorization:
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("token"))
        : "",
  },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.status === 500) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;
