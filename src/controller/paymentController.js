import axios from "axios";
import dotenv from "dotenv";
import { pool } from "../config/db.js";

dotenv.config();

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// 🟢 Initialize Payment
export const initializePayment = async (req, res) => {
  try {
    const { email, amount, booking_id } = req.body;

    if (!email || !amount || !booking_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert amount to kobo (Paystack works with kobo)
    const amountInKobo = amount * 100;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amountInKobo,
        metadata: { booking_id },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json({
      message: "Payment initialized successfully",
      data: response.data.data,
    });
  } catch (error) {
    console.error("Payment initialization error:", error.response?.data || error);
    return res.status(500).json({
      message: "Failed to initialize payment",
      error: error.response?.data || error.message,
    });
  }
};

// 🟣 Verify Payment
export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    // Make request to Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    // ✅ Check if payment was successful
    if (data.status === "success") {
      const bookingId = data.metadata?.booking_id;

      // ✅ Update DB only if bookingId exists
      if (bookingId) {
        await pool.query(
          "UPDATE bookings SET payment_status = 'paid' WHERE id = ?",
          [bookingId]
        );
      }

      return res.status(200).json({
        message: "Payment verified successfully",
        data,
      });
    } else {
      return res.status(400).json({
        message: "Payment not successful",
        data,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error);
    return res.status(500).json({
      message: "Failed to verify payment",
      error: error.response?.data || error.message,
    });
  }
};
