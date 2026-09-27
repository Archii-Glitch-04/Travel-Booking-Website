const express = require("express");
const router = express.Router();
const {
  getAllTrains,
  searchTrains,
  bookTrain,
  getBookingsByUser,
} = require("../controllers/trainController");
const { signup, login } = require("../controllers/userController");

router.get("/trains", getAllTrains);
router.get("/search", searchTrains);
router.post("/book", bookTrain);
router.get("/bookings", getBookingsByUser);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;