import axios from 'axios';
// import { makeRequest } from "../src/context/authContext.jsx";  // เปลี่ยน path ให้ตรงกับตำแหน่งไฟล์ axios.js ของคุณ


export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api", // Adjust as necessary
  withCredentials: true, // Required for cookies
});
