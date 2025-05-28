// Frontend/vite-project/src/Components/SearchBar/SearchBar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const params = new URLSearchParams(location.search);
  
      // Preserve existing filters and update search query
      params.set("search", query);
  
      // Ensure additional filters are included in the search URL
      if (!params.has("status")) params.set("status", "rent"); // Default value
      if (!params.has("minPrice")) params.set("minPrice", "500");
      if (!params.has("maxPrice")) params.set("maxPrice", "500000");
  
      navigate(`/search-results?${params.toString()}`);
    }
  };
  

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter Name, Keywords..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        <FaSearch className="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
