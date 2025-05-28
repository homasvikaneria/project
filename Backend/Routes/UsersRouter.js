// Backend/Routes/UsersRouter.js


import express from "express";
import { 
  getUsers, 
  getUserByEmail, 
  addUser, 
  loginUser, 
  getUserWishlist, 
  removeFromWishlist, 
  updateUserProfile, 
  updateWishlist,
  addToWishlist, // ✅ Added back (optional)
  upload 
} from "../Controller/UsersController.js";

const UsersRouter = express.Router();

// ✅ Get all users
UsersRouter.get("/", getUsers);

// ✅ Get user by email
UsersRouter.get("/email/:emailId", getUserByEmail);

// ✅ Register a new user (with optional profile image)
UsersRouter.post("/register", upload.single("profileImage"), addUser);

// ✅ User login
UsersRouter.post("/login", loginUser);

  UsersRouter.post("/:userId/wishlist/:propertyId", addToWishlist);

// ✅ Get user's wishlist
UsersRouter.get("/:userId/wishlist", getUserWishlist);

// ✅ Add/Remove property from wishlist (toggle)
UsersRouter.patch("/:userId/wishlist/:propertyId", updateWishlist); // 🔄 Added back

// ✅ Remove property from wishlist
UsersRouter.delete("/:userId/wishlist/:propertyId", removeFromWishlist);

// ✅ Update user profile (PATCH is preferred for partial updates)
UsersRouter.patch("/update/:userId", upload.single("profileImage"), updateUserProfile);

export default UsersRouter;
