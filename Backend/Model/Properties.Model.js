// just_home/Backend/Model/Properties.Model.js
// Backend/Model/Properties.Model.js
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  // Selected Category
  selectedCategory: { type: String, required: true }, // e.g., "Whole Home", "Private Room"

  // New Category Field
  category: { type: String, required: true }, // e.g., "Apartment", "Villa", "Farmhouse"

  // Address
  address: {
    street: { type: String, required: true },
    apartment: { type: String }, // Optional
    landmark: { type: String }, // Optional
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },

  // Essential Info
  essentialInfo: {
    guests: { type: Number, required: true, min: 1 },
    bedrooms: { type: Number, required: true, min: 1 },
    bathrooms: { type: Number, required: true, min: 1 },
    beds: { type: Number, required: true, min: 1 },
  },

  // Selected Features
  selectedFeatures: [{ type: String }], 

  // Photos
  photos: [{ type: String }],

  // Charm Info
  charmInfo: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    listingType: { type: String, enum: ["rent", "sale"], required: true },

    // Updated Price Field (in INR)
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "INR" }, // Default to Indian Rupees
    },
  },

  // Owner Info
  owner: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },

  // Timestamp
  createdAt: { type: Date, default: Date.now },
});

export const Property = mongoose.model("Property", PropertySchema);
