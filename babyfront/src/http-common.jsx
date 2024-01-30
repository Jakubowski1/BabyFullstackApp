/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:21436/api",
  headers: {
    "Content-type": "application/json"
  }
});