// src/controller/bookingController.js

export const createBooking = async (req, res) => {
  try {
    // Logic to create a new booking
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    // Logic to fetch all bookings
    res.status(200).json({ message: "Fetched all bookings successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};
