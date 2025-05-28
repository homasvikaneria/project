// just_home/Frontend/vite-project/src/redux/state.js
// Add this to your Frontend/vite-project/src/redux/state.js

import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage safely
const initialUser = JSON.parse(localStorage.getItem("user")) || null;
const initialToken = localStorage.getItem("token") || null;
const initialWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// 🔹 User Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: initialUser,
        token: initialToken,
        wishlist: initialWishlist
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
            state.wishlist = [];
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("wishlist");
        },
        setWishlist: (state, action) => {
            state.wishlist = action.payload;
            localStorage.setItem("wishlist", JSON.stringify(action.payload));
        },
        addToWishlist: (state, action) => {
            if (!state.wishlist.includes(action.payload)) {
                state.wishlist.push(action.payload);
                localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(id => id !== action.payload);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        }
    },
});

// 🔹 Listings Slice
const listingsSlice = createSlice({
    name: "listings",
    initialState: { listings: [] },
    reducers: {
        setListings: (state, action) => {
            state.listings = action.payload;
        },
    },
});

// ✅ Export actions
export const { setLogin, setLogout, setWishlist, addToWishlist, removeFromWishlist } = userSlice.actions;
export const { setListings } = listingsSlice.actions;

// ✅ Export reducers
export const userReducer = userSlice.reducer;
export const listingsReducer = listingsSlice.reducer;