import express from "express";
import { login,register,logout,getCurrentUser } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.get("/current-user", getCurrentUser);


export default router