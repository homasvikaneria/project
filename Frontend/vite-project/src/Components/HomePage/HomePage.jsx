// Frontend/vite-project/src/Components/HomePage/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link,useLocation } from "react-router-dom";
import axios from "axios";
import { FaAmazon, FaSpotify} from "react-icons/fa";
import "./HomePage.css";
import Mainnavbar from "../Mainnav/Mainnavbar";
import Footer from "../Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import { SiAmd, SiCisco, SiLogitech, } from "react-icons/si";
import Newsletter from "../Newsletter/Newsletter";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [randomProperties, setRandomProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:8000/properties");
        const properties = response.data;

        // Shuffle properties randomly
        const shuffled = properties.sort(() => 0.5 - Math.random());

        // Select first 3 random properties
        setRandomProperties(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const navigate = useNavigate(); // Initialize navigation

  const handleFilterClick = (filterType) => {
    if (filterType === "all") {
      navigate("/search-results"); // No query parameters to fetch all properties
    } else {
      navigate(`/search-results?status=${filterType}`);
    }
  };

  // Function to check authentication
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };


  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let url = "http://localhost:8000/properties";
        if (searchQuery) {
          url += `?search=${searchQuery}`;
        }
        const response = await axios.get(url);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [searchQuery]);

  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate("/propertyform");
    } else {
      navigate("/register");
    }
  };

  

  return (
    <div>
      <Mainnavbar />
      <div className="homepage-container">
        <div className="homepage-content">
          <p className="sub-text">We’re more than 745,000 apartments, places & plots.</p>
          <h1 className="main-heading">Find Your Perfect Home</h1>
          <div className="divider"></div>
          <SearchBar />

          <div className="property-filter-container">
            <h2 className="filter-heading">Explore all properties</h2>
            <div className="filter-buttons">
              <button className="filter-btn" onClick={() => handleFilterClick("all")}>
                All Properties
              </button>
              <button className="filter-btn" onClick={() => handleFilterClick("sale")}>
                For Sale
              </button>
              <button className="filter-btn" onClick={() => handleFilterClick("rent")}>
                For Rent
              </button>
            </div>
          </div>;
        </div>

        <div className="homepage-image">
          <img
            src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741005590/wb7b7wnxpdxj5xo9fkwm.png"
            alt="Houses"
            className="homepage-img full-screen-img"
          />
        </div>
      </div>

      <div className="trusted-companies">
        <p>Thousands of world's leading companies trust Space</p>
        <div className="icon-container">
          <FaAmazon size={40} />
          <SiAmd size={40} />
          <SiCisco size={40} />
          <SiLogitech size={40} />
          <FaSpotify size={40} />
        </div>
      </div>

      <div className="dream-house-container">

        <h2 className="title">Find Your Dream House as Easy as 1,2,3</h2>
        <p className="subtitle">Lorem ipsum dolor sit amet</p>
        <div className="steps-container">
          <div className="step">
            <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069020/jjnspd5wqgtwtse7fpue.png" alt="Search Home" className="step-img" />
            <h3 className="step-title">1. Search for your favorite house in your location</h3>
            <p className="step-description">
              Pellentesque egestas elementum egestas faucibus sem.
            </p>
          </div>
          <div className="step">
            <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069101/a75hqamtcugduhdynlrz.png" alt="Make Appointment" className="step-img" />
            <h3 className="step-title">2. Make a visit appointment with one of our agents</h3>
            <p className="step-description">
              Pellentesque egestas elementum egestas faucibus sem.
            </p>
          </div>
          <div className="step">
            <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741069123/ujucvdesdwvm8d8yhknx.png" alt="Get Dream House" className="step-img" />
            <h3 className="step-title">3. Get your dream house in a month, or less</h3>
            <p className="step-description">
              Pellentesque egestas elementum egestas faucibus sem.
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Random Properties Section */}
      <section className="random-properties">
        <h2 className="section-title">Featured Properties</h2>
        <div className="property-grid">
          {randomProperties.map((property) => (
            <div key={property._id} className="property-card">
              <img src={property.image} alt={property.name} className="property-img" />
              <h3 className="property-name">{property.name}</h3>
              <p className="property-price">${property.price}</p>
              <Link to={`/property/${property._id}`} className="view-details">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="why-work-container">
        {/* Left side images */}
        <div className="image-section">
          <div className="overlay-image">
            <img className="family" src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741147233/mqymnzw7q3v3tmwksdgx.png" alt="Happy Family" />
          </div>
          <div className="main-image">
            <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741147374/leegx0mdhoh7nlpuzxwp.png" alt="Modern House" />
          </div>
          <div className="property-tag">
            <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741148232/k7ltgn2ymwyaxsx3thop.png" alt="" />

          </div>
        </div>

        {/* Right side text */}
        <div className="text-section">
          <h2>Why You Should Work With Us</h2>
          <p>
            Pellentesque egestas elementum egestas faucibus sem. Velit nunc egestas ut morbi. Leo diam diam.
          </p>
          <ul>
            <p>✔ 100% Secure</p>
            <p>✔ Wide Range of Properties</p>
            <p>✔ Buy or Rent Homes</p>
            <p>✔ Trusted by Thousands</p>
          </ul>
          <button className="learn-more-btn">Learn More →</button>
        </div>
      </section>




      <div className="home-section">
        <div className="home-card">
          {/* Left Card */}
          <div className="home-card-content">
            <h2>Looking for the new home?</h2>
            <p>10 new offers every day. 350 offers on site, trusted by a community of thousands of users.</p>
            <button className="home-btn" onClick={() => navigate("/search-results")}>Get Started →</button>
          </div>
          <img src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741010102/ytxvtxbk97lawdofdxk1.png" alt="House" className="home-image" />
        </div>

        <div className="home-card right-card">
          <div className="home-card-content">
            <h2>Want to sell your home?</h2>
            <p>10 new offers every day. 350 offers on site, trusted by a community of thousands of users.</p>
            <button className="home-btn" onClick={handleGetStarted}>
              Get Started →
            </button>
          </div>
          <img
            src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1741010129/xu2chkh6l3pyjipklmmz.png"
            alt="House"
            className="home-image"
          />
        </div>
      </div>


      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
