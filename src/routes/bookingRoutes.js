import express from "express";
import { createBooking, getAllBookings } from "../controller/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new booking
router.post("/", protect,  createBooking);

// Get all bookings
router.get("/", protect,  getAllBookings);

export default router;

