// Frontend/vite-project/src/Components/Wishlist/Wishlist.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist, removeFromWishlist, addToWishlist } from "../../redux/state";
import Mainnavbar from "../Mainnav/Mainnavbar";
import "../SearchResults/SearchResults.css";
import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);
    const wishlist = useSelector((state) => state.user.wishlist || []);

    const [wishlistProperties, setWishlistProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Fetch full details for all wishlist properties
    const fetchWishlistProperties = async () => {
        if (!user?._id || wishlist.length === 0) {
            setWishlistProperties([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const responses = await Promise.all(
                wishlist.map((propertyId) =>
                    fetch(`https://just-home.onrender.com/properties/${propertyId}
`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                        .then((res) => res.json())
                        .catch((err) => console.error("Error fetching property:", err))
                )
            );

            setWishlistProperties(responses.filter(Boolean)); // Remove any failed fetches
        } catch (error) {
            console.error("Error fetching wishlist properties:", error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchWishlistProperties();
    }, [wishlist]);

    // ✅ Toggle wishlist functionality
    const toggleWishlist = async (propertyId, e) => {
        e.stopPropagation();

        if (!user?._id) {
            navigate("/register");
            return;
        }

        const isInWishlist = wishlist.includes(propertyId);
        const method = isInWishlist ? "DELETE" : "POST";
        const endpoint = `https://just-home.onrender.com/users/${user._id}/wishlist/${propertyId}
`;

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                if (isInWishlist) {
                    dispatch(removeFromWishlist(propertyId));
                } else {
                    dispatch(addToWishlist(propertyId));
                }
            } else {
                console.error("Failed to update wishlist:", await response.text());
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    };

    return (
        <div>
            <Mainnavbar />
            <div className="findhomes-wrapper">
                <h2 className="findhomes-heading">Your Wishlist</h2>

                {loading ? (
                    <p className="findhomes-loading">Loading wishlist...</p>
                ) : wishlistProperties.length > 0 ? (
                    <div className="findhomes-grid">
                        {wishlistProperties.map((property) => (
                            <div key={property._id} className="findhomes-card">
                                <div
                                    className="findhomes-image-wrapper"
                                    onClick={() => navigate(`/property/${property._id}`)}
                                >
                                    <img
                                        src={property.photos?.[0] ? `https://just-home.onrender.com${property.photos[0]}
` : "/fallback-image.jpg"}
                                        alt={property.charmInfo?.title || "Property"}
                                        className="findhomes-image"
                                    />
                                    <div
                                        className="findhomes-wishlist"
                                        onClick={(e) => toggleWishlist(property._id, e)}
                                    >
                                        <span className={`heart ${wishlist.includes(property._id) ? "filled" : "outline"}`}>♥</span>
                                    </div>
                                </div>
                                <div className="findhomes-details">
                                    <h3 className="findhomes-title">{property.charmInfo?.title}</h3>
                                    <p className="findhomes-category">{property.category}</p>
                                    <p className="findhomes-location">
                                        📍 {property.address?.city || "Unknown City"}, {property.address?.state || "Unknown State"}
                                    </p>
                                    <p className="findhomes-cost">
                                        ₹{property.charmInfo?.price.amount} ({property.charmInfo?.price.currency})
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="findhomes-no-results">Oops! Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
