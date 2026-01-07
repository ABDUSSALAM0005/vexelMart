// 

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendVerificationCode,
  completeRegistration,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);
router.post("/complete-register", completeRegistration);
router.post("/resend-code", resendVerificationCode);

// PROTECTED ROUTES
router.get("/profile", protect, getUserProfile);

export default router;
