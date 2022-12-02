import axios from "axios";

const BASE_URL = "http://localhost:3030/api/v1";

let jwt = localStorage.getItem("jwt");
window.addEventListener("storage", function () {
  jwt = localStorage.getItem("jwt");
});
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { jwt },
});
