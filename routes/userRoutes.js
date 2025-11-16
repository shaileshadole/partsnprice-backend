import express from "express";
import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/meprofile", isAuthenticated, getMyProfile);

export default router;
