// data/seed.js
const mongoose = require("mongoose");
const Train = require("../models/Train");
require("dotenv").config();

const cities = [
  "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", "Hyderabad", "Ahmedabad",
  "Pune", "Jaipur", "Lucknow", "Bhopal", "Patna", "Indore", "Chandigarh", "Kochi",
  "Nagpur", "Visakhapatnam", "Surat", "Kanpur", "Amritsar"
];

const trainTypes = [
  "Rajdhani Express", "Shatabdi Express", "Duronto Express", "Garib Rath",
  "Superfast Express", "Passenger", "Intercity Express", "Mail Express",
  "Vande Bharat Express", "Jan Shatabdi"
];

function randomTime() {
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${hour}:${minute}`;
}

function generateTrains(n = 100) {
  const trains = [];
  for (let i = 0; i < n; i++) {
    const [from, to] = cities.sort(() => 0.5 - Math.random()).slice(0, 2);
    trains.push({
      name: `${trainTypes[Math.floor(Math.random() * trainTypes.length)]} ${Math.floor(100 + Math.random() * 900)}`,
      from,
      to,
      departure: randomTime(),
      arrival: randomTime(),
      availability: Math.floor(Math.random() * 180 + 20),
      price: Math.floor(Math.random() * 1700 + 300)
    });
  }
  return trains;
}

const sampleTrains = generateTrains(400);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Train.deleteMany({});
    await Train.insertMany(sampleTrains);
    console.log("🚂 100+ Realistic Trains Inserted to MongoDB!");
    mongoose.disconnect();
  })
  .catch(err => console.error("❌ MongoDB Insertion Error:", err));
