import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import { createEquipmentTable } from "./src/models/equipmentModel.js";
import equipmentRoutes from "./src/routes/equipmentRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import { sendEmail } from "./src/sendEmail.js"; 
import { createBookingTable } from "./src/models/bookingModel.js";
import { createUserTable } from "./src/models/userModel.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async () => {
  try {
    await connectDB();
    await createEquipmentTable();
    await createBookingTable();
    await createUserTable();


    // middleware
    app.use(express.json());


    // mount routes
    app.use("/api/equipment", equipmentRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use('/api/payment', paymentRoutes);
    

    // health check
    app.get("/", (req, res) =>
      res.send("Farm Equipment Rental Platform API Running")
    );

    // test email route
    app.get("/test-email", async (req, res) => {
      try {
        await sendEmail(
          "noheemottijani@gmail.com",
          "Test Email - Farm Equipment Rental",
          "<h3>This is a test email sent successfully from your project.</h3>"
        );
        res.send("Email sent successfully!");
      } catch (error) {
        console.error("Email send failed:", error);
        res.status(500).send("Failed to send email.");
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

start();
