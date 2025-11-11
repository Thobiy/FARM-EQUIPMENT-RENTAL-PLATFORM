import express from "express";
import {
  initializePayment,
  verifyPayment,
} from "../controller/paymentController.js";

const router = express.Router();

// Initialize payment
router.post("/initialize", initializePayment);

// Verify payment
router.get("/verify/:reference", verifyPayment);

export default router;
