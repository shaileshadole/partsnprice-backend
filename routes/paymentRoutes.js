import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addPayment,
  deletePayment,
  getPayment,
  updatePayment,
} from "../controllers/paymentControllers.js";

const router = express.Router();

router.post("/", isAuthenticated, addPayment);
router.get("/", isAuthenticated, getPayment);
router.put("/:paymentId", isAuthenticated, updatePayment);
router.delete("/:paymentId", isAuthenticated, deletePayment);

export default router;
