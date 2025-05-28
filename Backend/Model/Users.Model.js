// Backend/Model/Users.Model.js
import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImagePath: { type: String, default: "/uploads/default-avatar.png" },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    phoneNumber: { type: String },

    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Properties" }],
    reservationList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservations" }],
    propertyList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Properties" }]
}, { timestamps: true });

export const Users = mongoose.model("Users", usersSchema);
