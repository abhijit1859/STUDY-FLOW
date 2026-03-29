// routes/auth.js
import express from "express";
import { registerUser } from "../services/registerUser.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
