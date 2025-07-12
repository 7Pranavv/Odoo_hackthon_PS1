import { Router } from 'express';

// Controllers
import {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationEmail,
  forgotPasswordRequest,
  resetPassword,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser
} from '../controllers/auth.controllers.js';

// Middlewares
import { validate } from '../middlewares/validator.middleware.js';
import { userRegistrationValidator } from '../validators/index.js';

// Initialize router
const router = Router();

// Routes
router.route("/register").post(userRegistrationValidator(), validate, registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").post(verifyEmail);
router.route("/resend-verification-email").post(resendVerificationEmail);
router.route("/forgot-password").post(forgotPasswordRequest);
router.route("/reset-password").post(resetPassword);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(changeCurrentPassword);
// router.route("/me").get(getCurrentUser); // Optional: add auth middleware here

export default router;
