const express = require("express");
const router = express.Router();
const {
  getAllTrains,
  searchTrains,
  bookTrain,
  getBookingsByUser,
} = require("../controllers/trainController");

router.get("/trains", getAllTrains);
router.get("/search", searchTrains);
router.post("/book", bookTrain);
router.get("/bookings", getBookingsByUser); // 🔥 new route

module.exports = router;
