import axios from "axios";
const token = import.meta.env.VITE_REACT_TOKEN

export const makeRequest = axios.create({
  baseURL: "http://localhost:5000",

});