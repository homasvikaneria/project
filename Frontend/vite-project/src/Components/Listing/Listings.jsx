// just_home/Frontend/vite-project/src/Components/Listing/Listings.jsx
import React, { useState } from "react";
import { categories } from "../../assets/data";
import "./Listings.css"; // Import CSS

const Listings = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category); // Callback to send selected category to parent
    }
  };

  return (
    <section id="listing" className="listings-container">
      <h1 className="heading">Add a Property</h1>
      <div className="categories-container">
        {categories.map((category) => (
          <div
            key={category.label}
            onClick={() => handleCategorySelect(category.label)}
            className={`category-box ${category.label === selectedCategory ? "active" : ""}`}
          >
            <div className="category-icon" style={{ backgroundColor: category.color }}>
              {category.icon}
            </div>
            <p>{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listings;
