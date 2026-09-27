const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  pnr: {
    type: String,
    unique: true, //ensures MongoDB itself enforces no two bookings ever share a PNR
    required: true,
  },

  username: String,
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
  },
  from: String,   // ✅ new field for origin station
  to: String,     // ✅ new field for destination station
  seats: Number,
  date: String,
  bookedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
