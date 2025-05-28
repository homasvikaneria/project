// just_home/Backend/Controller/ContactusController.js
// d:\New folder\1stYearFinalProject\just_home\Backend\Controller\ContactusController.js
// just_home/Backend/Controller/ContactusController.js
// practice/Backend/Controller/ContactusController.js

import { Contactus } from "../Model/Contactus.Model.js";

// GET /contactus: Fetch all contactus data
export const getAllContactus = async (req, res) => {
    try {
        const contactusList = await Contactus.find();
        if (contactusList.length > 0) {
            res.status(200).json(contactusList);
        } else {
            res.status(404).json({ message: "No contact entries found." });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

// POST /contactus: Add a new contact entry
export const postContactus = async (req, res) => {
    try {
        const newContact = new Contactus(req.body);
        const savedContact = await newContact.save();
        res.status(201).json({
            message: "Contact added successfully",
            userId: savedContact._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};
