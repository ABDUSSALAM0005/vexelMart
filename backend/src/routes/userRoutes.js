// 

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  verifyEmail,
  resendVerificationCode,
  completeRegistration,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  validateOTP,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);
router.post("/validate-code", validateOTP);
router.post("/complete-register", completeRegistration);
router.post("/resend-code", resendVerificationCode);

// PROTECTED ROUTES
router.get("/profile", protect, getUserProfile);

//Admin Routes
router.get('/', protect, admin, getUsers);

router.delete('/:id', protect, admin, deleteUser);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);

export default router;
