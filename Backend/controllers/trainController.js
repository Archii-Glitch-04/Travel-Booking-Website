const Train = require("../models/Train");
const Booking = require("../models/Booking");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Helper: Generate a realistic PNR-style booking ID
function generatePNR() {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6 digits
  return `SEH${randomDigits}`;
}

// ✅ Helper: Check if selected date is today or future
function isDateValid(inputDate) {
  const selected = new Date(inputDate);
  const now = new Date();
  selected.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return selected >= now;
}

// ✅ Helper: Send booking confirmation email
async function sendConfirmationEmail(toEmail, booking, trainName) {
  try {
    await resend.emails.send({
      from: "Safar-E-Hind <onboarding@resend.dev>",
      to: toEmail,
      subject: `Booking Confirmed - PNR ${booking.pnr}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background: #7a1f1f; color: #fff; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">🚆 Safar-E-Hind</h2>
            <p style="margin: 5px 0 0;">Booking Confirmed!</p>
          </div>
          <div style="padding: 20px;">
            <p><strong>PNR:</strong> ${booking.pnr}</p>
            <p><strong>Train:</strong> ${trainName}</p>
            <p><strong>From:</strong> ${booking.from}</p>
            <p><strong>To:</strong> ${booking.to}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Seats:</strong> ${booking.seats}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #555; font-size: 14px;">Thank you for booking with Safar-E-Hind. Have a safe and pleasant journey! 🙏</p>
          </div>
        </div>
      `,
    });
    console.log("📧 Confirmation email sent to", toEmail);
  } catch (err) {
    console.error("❌ Email sending failed:", err);
  }
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
  const trimmedFrom = from.trim();
  const trimmedTo = to.trim();

  if (!isDateValid(date)) {
    return res.status(400).json({
      message: "You can only search trains for today or future dates.",
    });
  }

  try {
    const trains = await Train.find({
      from: { $regex: new RegExp(`^${trimmedFrom}$`, "i") },
      to: { $regex: new RegExp(`^${trimmedTo}$`, "i") },
    });
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};

// 🔹 Book a Train with date validation
const bookTrain = async (req, res) => {
  const { trainId, username, email, seats, date } = req.body;

  if (!isDateValid(date)) {
    return res.status(400).json({
      message: "You can only book trains for today or future dates.",
    });
  }

  try {
    const train = await Train.findById(trainId);
    if (!train) return res.status(404).json({ message: "Train not found" });

    if (train.availability < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    train.availability -= seats;
    await train.save();

    const pnr = generatePNR();

    const booking = new Booking({
      pnr,
      trainId,
      username,
      seats,
      date,
      from: train.from,
      to: train.to,
    });

    await booking.save();

    if (email) {
      await sendConfirmationEmail(email, booking, train.name);
    }

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