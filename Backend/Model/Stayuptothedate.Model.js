// just_home/Backend/Model/Stayuptothedate.Model.js
import mongoose from 'mongoose';

const stayuptothedateSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

export const Stayuptothedate = mongoose.model("Stayuptothedate", stayuptothedateSchema);
