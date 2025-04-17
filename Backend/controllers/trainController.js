const Train = require("../models/Train");
const Booking = require("../models/Booking");

// ✅ Helper: Check if selected date is today or future
function isDateValid(inputDate) {
  const selected = new Date(inputDate);
  const now = new Date();
  selected.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return selected >= now;
}

// 🔹 Get all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trains" });
  }
};

// 🔹 Search trains by From, To, and Date (with validation)
const searchTrains = async (req, res) => {
  const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ message: "Missing search parameters" });
  }

  // ❌ Reject past dates including earlier today
  if (!isDateValid(date)) {
    return res.status(400).json({
      message: "You can only search trains for today or future dates.",
    });
  }

  try {
    const trains = await Train.find({
      from: { $regex: new RegExp(from, "i") },
      to: { $regex: new RegExp(to, "i") },
    });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// 🔹 Book a Train with date validation
const bookTrain = async (req, res) => {
  const { trainId, username, seats, date } = req.body;

  // ❌ Disallow booking for past dates
  if (!isDateValid(date)) {
    return res.status(400).json({
      message: "You can only book trains for today or future dates.",
    });
  }

  try {
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });

    if (train.availability < seats) {
      return res
        .status(400)
        .json({ message: "Not enough seats available" });
    }

    train.availability -= seats;
    await train.save();

    const booking = new Booking({
      trainId,
      username,
      seats,
      date,
      from: train.from,
      to: train.to,
    });

    await booking.save();

    res.status(201).json({ message: "Booking successful!", booking });
  } catch (error) {
    console.error("Booking failed:", error);
    res.status(500).json({ error: "Failed to book train" });
  }
};

// 🔹 Get bookings by username
const getBookingsByUser = async (req, res) => {
  const { username } = req.query;

  try {
    const bookings = await Booking.find({ username });

    const formattedBookings = bookings.map((b) => ({
      username: b.username,
      from: b.from,
      to: b.to,
      date: b.date,
      seats: b.seats,
      bookedAt: b.bookedAt,
    }));

    res.json(formattedBookings);
  } catch (err) {
    console.error("Fetch bookings failed:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = {
  getAllTrains,
  searchTrains,
  bookTrain,
  getBookingsByUser,
};
