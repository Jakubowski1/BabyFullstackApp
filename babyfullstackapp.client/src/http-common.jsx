import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:7246;http://localhost:5051",
  headers: {
    "Content-type": "application/json"
  }
});