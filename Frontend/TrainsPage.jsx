import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const TrainsPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({});

  const handleLogin = () => {
    if (username && password) {
      setLoggedIn(true);
    }
  };

  const handleSignup = () => {
    if (!name || !email || !username || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    alert("Name can only contain letters and spaces.");
    return;
  }


    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert(`🎉 Welcome aboard, ${name}! You can now log in.`);
    setIsSignUp(false);
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSearch = async () => {
    if (!from || !to || !date) {
      setMessage("Please fill all fields: From, To, and Date.");
      setShowTable(false);
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.get("http://localhost:5000/search", {
        params: { from, to, date },
      });

      if (response.data.length === 0) {
        setMessage("No trains found for the selected route.");
        setShowTable(false);
      } else {
        setTrains(response.data);
        setShowTable(true);
      }
    } catch (error) {
      console.error("Error fetching trains:", error);
      setMessage("Error fetching trains. Please try again later.");
      setShowTable(false);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setFrom("");
    setTo("");
    setDate("");
    setMessage("");
    setShowTable(false);
  };

  const handleBook = async (trainId) => {
    const seats = selectedSeats[trainId] || 1;
    try {
      await axios.post("http://localhost:5000/book", {
        trainId,
        username,
        seats,
        date,
      });
      alert("✅ Booking is Confirmed!!! Waiting to see you on board, Happy Journey 🦚");
      handleSearch();
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Booking failed. Try again.");
    }
  };

  const handleSeatChange = (trainId, value) => {
    const updated = { ...selectedSeats, [trainId]: parseInt(value) || 1 };
    setSelectedSeats(updated);
  };

  return (
    <div className="train-page">
      <h1 className="booking-title">🚆 BHARAT EXPRESS 🙏</h1>

      {!loggedIn ? (
        <div className="login-box animate-pop">
          <h3>{isSignUp ? "Sign Up for Safar-E-Hind" : "Login to Book Trains"}</h3>

          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button onClick={isSignUp ? handleSignup : handleLogin}>
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <p className="toggle-form">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsSignUp(false)}>Login</span>
              </>
            ) : (
              <>
                New here?{" "}
                <span onClick={() => setIsSignUp(true)}>Sign Up</span>
              </>
            )}
          </p>
        </div>
      ) : (
        <div className="train-booking-container">
          <form
            className="train-form animate-slide"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <input
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button type="submit">Search</button>
            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </form>

          {message && <div className="error-message">{message}</div>}
          {loading && <p style={{ textAlign: "center" }}>Loading trains...</p>}

          {showTable && trains.length > 0 && (
            <div className="table-container">
              <div className="table-header">
                <button className="close-btn" onClick={() => setShowTable(false)}>
                  ❌
                </button>
              </div>
              <table className="train-table">
                <thead>
                  <tr>
                    <th>Train Name</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Seats</th>
                    <th>Price (₹)</th>
                    <th>Book</th>
                  </tr>
                </thead>
                <tbody>
                  {trains.map((train) => (
                    <tr key={train._id}>
                      <td>{train.name}</td>
                      <td>{train.from}</td>
                      <td>{train.to}</td>
                      <td>{train.departure}</td>
                      <td>{train.arrival}</td>
                      <td>{train.availability}</td>
                      <td>{train.price}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          max={train.availability}
                          value={selectedSeats[train._id] || 1}
                          onChange={(e) =>
                            handleSeatChange(train._id, e.target.value)
                          }
                          className="seat-input"
                        />
                        <button
                          className="book-btn"
                          onClick={() => handleBook(train._id)}
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrainsPage;
