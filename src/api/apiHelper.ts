import axios from "axios";

const { VITE_APP_API_URL } = import.meta.env;

export const axiosApiInstance = axios.create({
  baseURL: String(VITE_APP_API_URL),
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.log("status: ", error.status);
    console.error("response: ", error.response);
  } else {
    console.error(error);
  }
};
