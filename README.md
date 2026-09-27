# 🚆 Safar-E-Hind — Full-Stack Indian Travel Booking Platform

🔗 **Live Demo:** [safar-e-hind](https://travel-booking-website-mocha.vercel.app)

Safar-E-Hind is a full-stack travel booking platform that lets users search, book, and manage train journeys across India — combining a heritage-themed, culturally rich UI with a real, working backend: authenticated accounts, live database-backed search, PNR-based bookings, and automated email confirmations.

Built as a complete simulation of a real-world booking system, from user signup to a confirmed ticket landing in your inbox.

---

## ✨ Key Features

- 🔐 **Real Authentication** — secure signup/login with bcrypt password hashing, backed by MongoDB
- 🔍 **Live Train Search** — search by source, destination, and date against a real database
- 🎫 **PNR-Based Booking System** — every booking generates a unique, ticket-style PNR
- 📧 **Automated Email Confirmation** — booking details sent instantly via a transactional email API
- ✅ **Styled Booking Confirmation** — in-app confirmation card with full journey details
- 🍛 **"Flavours of India"** — a visually rich showcase of regional Indian cuisines
- 🗺️ **Popular Destinations Grid** — linking to India's most-loved tourist spots
- 📱 **Fully Responsive UI** — heritage-inspired design with smooth animated transitions

---

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, CSS3, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas (via Mongoose)
**Auth & Security:** bcrypt.js for password hashing
**Email:** Resend (transactional email API)
**Deployment:** Vercel (frontend) · Render (backend)
**Tooling:** Git, VS Code, Postman

---

## 🚀 Live Architecture

This isn't just a local demo — it's deployed end to end:
- Frontend hosted on **Vercel**, auto-deployed from `main`
- Backend hosted on **Render**, auto-deployed from `main`
- Database on **MongoDB Atlas**
- Transactional emails via **Resend**

---

## 🎯 Purpose

This project was built to apply full-stack development concepts in a real-world simulation — covering database design, secure authentication, REST API design, third-party API integration (email), and deploying a production-style app with a live frontend and backend talking to each other over the internet.

---
