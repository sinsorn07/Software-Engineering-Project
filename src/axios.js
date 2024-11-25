import axios from 'axios';

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api", // Adjust as necessary
  withCredentials: true, // Required for cookies
});
