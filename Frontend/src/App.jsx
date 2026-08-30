import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FaTrain, FaBars, FaTimes } from "react-icons/fa";
import TrainsPage from "./TrainsPage";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);

  const destinations = [
    { name: "Rajasthan", desc: "The land of kings, famous for its forts and desert safaris.", url: "https://www.tourism.rajasthan.gov.in/" },
    { name: "Kerala", desc: "God’s Own Country, known for backwaters and lush landscapes.", url: "https://www.keralatourism.org/" },
    { name: "Goa", desc: "India’s party capital with stunning beaches and nightlife.", url: "https://www.goatourism.gov.in/" },
    { name: "Maharashtra", desc: "Home to Mumbai, Bollywood, and historical caves.", url: "https://www.maharashtratourism.gov.in/" },
    { name: "Jammu and Kashmir", desc: "A paradise on Earth with breathtaking valleys and lakes.", url: "https://www.thrillophilia.com/cities/kashmir/tours?utm_source=bing&utm_medium=kashmir%20trip&utm_campaign=BA-020425-Search-Kashmir-Tour-Packages&utm_term=&utm_content=Kashmir&msclkid=d0c5d0f45fd1169747ccb701cd79dea3" },
    { name: "Uttarakhand", desc: "Land of Gods, famous for pilgrimages and hill stations.", url: "https://www.uttarakhandtourism.gov.in/" },
    { name: "Himachal Pradesh", desc: "Scenic mountains, adventure sports, and tranquil towns.", url: "https://himachaltourism.gov.in/" },
    { name: "Delhi", desc: "The capital city with historical landmarks like India Gate & Red Fort.", url: "https://www.delhitourism.gov.in/" },
    { name: "Sikkim", desc: "Nestled in the Himalayas, Sikkim is known for its biodiversity and peaceful monasteries.", url: "https://www.sikkimtourism.gov.in/" },
    { name: "Tamil Nadu", desc: "A land of ancient temples, rich culture, and coastal beauty.", url: "https://www.tamilnadutourism.tn.gov.in/" }
  ];

  const cuisines = [
    { name: "Rajasthani Thali", image: "rajasthani-thali.jpg", link: "https://www.holidify.com/pages/food-of-rajasthan-389.html" },
    { name: "Kerala Sadya", image: "kerala-sadya.jpg", link: "https://ling-app.com/ml/kerala-foods/" },
    { name: "Goan Fish Curry", image: "goan-fish.jpg", link: "https://hinterscapes.com/news/25-must-try-dishes-that-represent-food-of-goa" },
    { name: "Maharashtrian Misal", image: "vada-pav.jpg", link: "https://www.holidify.com/pages/maharashtra-food-1335.html" },
    { name: "Kashmiri Wazwan", image: "kashmiri-rogan-josh.jpg", link: "https://www.holidaymonk.com/kashmiri-dishes-best-of-kashmiri-cuisine/" },
    { name: "Uttarakhand Aloo Ke Gutke", image: "aloo-ke-gutke.jpg", link: "https://cookpad.com/in/search/uttarakhand" },
    { name: "Himachali Dham", image: "himachali-dham.jpg", link: "https://www.foodforward.in/posts/himachali-dham" },
    { name: "Delhi Chaat", image: "delhi-chaat.jpg", link: "https://www.teamaxcafe.in/post/famous-food-of-delhi-exploring-traditional-dishes-and-iconic-street-food" },
    { name: "Sikkimese Momo", image: "sikkim-momo.jpg", link: "https://sikkimtourism.gov.in/Public/ExperienceSikkim/cuisines" },
    { name: "Tamil Nadu Idli Sambar", image: "idli-sambar.jpg", link: "https://www.carlton-kodaikanal.com/blogs/tamil-nadu-famous-food.html" }
  ];

  return (
    <div className="app">
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navbar */}
      <nav className={`navbar ${showMenu ? "show" : ""}`}>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => setShowMenu(false)}>Home</a></li>
          <li><a href="#about" onClick={() => setShowMenu(false)}>About Us</a></li>
          <li><a href="#destinations" onClick={() => setShowMenu(false)}>Popular Destinations</a></li>
          <li><a href="#cuisines" onClick={() => setShowMenu(false)}>Cuisines</a></li>
          <li><Link to="/trains" onClick={() => setShowMenu(false)}><FaTrain /> Trains</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1 className="safar-title">
            <span className="orange">Safar</span>-
            <span className="white">E</span>-
            <span className="green">Hind</span>
          </h1>
          <h1 className="main-title">
            THE GRAND <br /><span className="bharat-tour">BHARAT TOUR</span>
          </h1>
        </div>
      </section>

      {/* About Us */}
      <section id="about">
        <h2 className="about-title">About Us</h2>
        <div className="about">
          <img className="about-img" src="/assets/images/about.jpg" alt="About Us" />
          <div className="about-text">
            <p>
              Welcome to <strong>Safar-E-Hind</strong>, your one-stop destination for discovering the wonders of India.
              Whether you're planning a family vacation, a solo trip, or an adventurous getaway, we provide the best
              travel experiences across the country.
            </p>
            <p>
              Our platform offers curated travel guides, real-time tourism updates, and seamless booking assistance
              to help you explore India's rich culture, heritage, and scenic landscapes.
            </p>
            <p>
              With exclusive insights into the best tourist attractions, local cuisines, and hidden gems, we aim to
              make your journey effortless and memorable. Join us and embark on a breathtaking adventure across India! ✈️🌏
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="packages">
        <h2 className="packages-title">Popular Destinations</h2>
        <div className="destination-grid">
          {destinations.map((dest, index) => (
            <a key={index} href={dest.url} target="_blank" rel="noopener noreferrer" className="destination-card">
              <img
                src={`/assets/images/${dest.name.toLowerCase().replace(/ /g, "-")}.jpg`}
                alt={dest.name}
                className="destination-img"
              />
              <h3>{dest.name}</h3>
              <p className="destination-desc">{dest.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Flavours of India */}
      <section id="cuisines" className="cuisine-section">
        <h2 className="cuisine-title">🍽️ Flavours of India</h2>
        <div className="cuisine-grid">
          {cuisines.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="cuisine-card">
                <img
                  src={`/assets/images/cuisines/${item.image}`}
                  alt={item.name}
                  className="cuisine-img"
                />
                <div className="cuisine-overlay">
                  <p>{item.name}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="view-more-container">
          <a
            href="https://www.cozymeal.com/magazine/indian-food"
            target="_blank"
            rel="noopener noreferrer"
            className="view-more-link"
          >
            ✨ View More Cuisines
          </a>
        </div>
      </section>

      {/* Footer */}
      
<footer className="footer">
  <div className="footer-content">
    <div className="footer-brand">
      <img src="/assets/images/logo.png" alt="Safar-E-Hind Logo" className="footer-logo" />
      <p>
        <strong>Safar-E-Hind</strong> is your companion for discovering India's vibrant culture,
        scenic places, and hidden gems. Let’s explore together 🧡.
      </p>
    </div>

    <div className="footer-links">
      <h4>Useful Links</h4>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#packages">Tour Packages</a></li>
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#cuisines">Cuisines</a></li>
      </ul>
    </div>

    <div className="footer-contact">
      <h4>Contact</h4>
      <p>
  <i className="fas fa-envelope" style={{ color: '#f5c518', marginRight: '8px' }}></i>
  <a
    href="mailto:archanakumarithakur0604@gmail.com"
    style={{ color: '#ccc', textDecoration: 'none' }}
  >
    archanakumarithakur0604@gmail.com
  </a>
</p>
<p style={{ paddingLeft: '24px' }}>
  <a
    href="mailto:1032222224@mitwpu.edu.in"
    style={{ color: '#ccc', textDecoration: 'none' }}
  >
    1032222224@mitwpu.edu.in
  </a>
</p>

      <h4>WhatsApp</h4>
      <p>
        <i className="fab fa-whatsapp" style={{ color: '#f5c518', marginRight: '8px' }}></i>&nbsp;
        +91 88504 21452, +91 80978 16008
      </p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>&copy; 2025 <strong>Safar-E-Hind</strong>. All rights reserved.</p>
  </div>
</footer>
</div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trains" element={<TrainsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
