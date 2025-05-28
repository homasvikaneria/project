// just_home/Frontend/vite-project/src/Components/PropertyDetails/PropertyDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaBath, FaCar, FaDog, FaCouch, FaCalendarAlt, FaMoneyBillWave, FaTags, FaUser, FaEnvelope, FaPhone, FaStar } from "react-icons/fa";
import Mainnavbar from "../Mainnav/Mainnavbar";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://just-home.onrender.com/properties/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Property not found");
        }
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading property details...</p>;
  if (error || !property) return <p className="error">Property not found.</p>;

  console.log("Owner Data:", property.owner); // Debugging Log

  return (
    <div>
      <Mainnavbar />
      <div className="property-container" style={{ marginTop: "65px" }}>
        {/* Left Section - Property Details */}
        <div className="property-info">
          <h1 className="property-title">{property.title}</h1>
          <p className="property-location">
            <FaMapMarkerAlt /> {property.location}, {property.state}
          </p>

          {/* Key Details */}
          <div className="property-details">
            <span><FaBed /> {property.bedrooms} Bedrooms</span>
            <span><FaBath /> {property.bathrooms} Bathrooms</span>
            <span><FaCalendarAlt /> Built in {property.yearBuilt}</span>
            <span><FaCar /> {property.parking}</span>
            {property.petFriendly && <span><FaDog /> Pet-Friendly</span>}
            {property.furnished && <span><FaCouch /> {property.furnished}</span>}
          </div>

          {/* Status Button */}
          <div className="property-status">
            {property.status && typeof property.status === "string" ? (
              property.status.toLowerCase() === "for sale" ? (
                <button className="sale-button">For Sale</button>
              ) : (
                <button className="rent-button">For Rent</button>
              )
            ) : (
              <p className="error">Status not available</p>
            )}
          </div>

          {/* Price & Discount */}
          <h2 className="property-price">
            <FaMoneyBillWave /> {property.price} {property.priceUnit}
          </h2>
          {property.discountOffer && (
            <p className="discount-offer">
              <FaTags /> {property.discountOffer}
            </p>
          )}

          {/* Owner Information */}
          <div className="property-owner">
            <h3><FaUser /> Owned by {property.owner?.name}</h3>
            <p><FaEnvelope /> {property.owner?.email}</p>
            <p><FaPhone /> {property.owner?.phone}</p>
          </div>

          {/* Facilities Section */}
          <div className="property-facilities">
            <h2>What this place offers?</h2>
            <div className="facilities-grid">
              {property.facilities?.map((facility, index) => (
                <div key={index} className="facility-item">
                  {facility}
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Landmarks */}
          {property.nearbyLandmarks?.length > 0 && (
            <div className="property-landmarks">
              <h2>Nearby Landmarks</h2>
              <ul>
                {property.nearbyLandmarks.map((landmark, index) => (
                  <li key={index}><FaMapMarkerAlt /> {landmark}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews Section */}
          {property.reviews?.length > 0 && (
            <div className="property-reviews">
              <h2>Reviews</h2>
              {property.reviews.map((review, index) => (
                <div key={index} className="review">
                  <strong><FaUser /> {review.user}</strong> <FaStar /> {review.rating}
                  <p>"{review.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section - Property Image */}
        <div className="property-image-section">
          <img src={property.coverimg} alt={property.title} className="main-image" />
          <div className="other-images">
            {property.images?.map((img, index) => (
              <img key={index} src={img} alt={`Property image ${index + 1}`} className="small-image" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
