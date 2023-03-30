import express from "express";
const router = express.Router();

import { signup, signin, googleSignIn } from "../controllers/user.js";

router.post("/register", signup);
router.post("/login", signin);
router.post("/googleSignIn", googleSignIn);

export default router;
