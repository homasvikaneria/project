// just_home/Backend/Model/Contactus.Model.js

import mongoose from 'mongoose';

const contactusSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },


})


export const Contactus = mongoose.model("Contactus", contactusSchema) 