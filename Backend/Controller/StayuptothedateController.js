// just_home/Backend/Controller/StayuptothedateController.js


import { Stayuptothedate } from "../Model/Stayuptothedate.Model.js";

// GET /stayuptothedate: Fetch all stayuptothedate data
// export const getAllEntries = async (req, res) => {
//     try {
//         const stayuptothedateList = await Stayuptothedate.find();
//         if (stayuptothedateList.length > 0) {
//             res.status(200).json(stayuptothedateList);
//         } else {
//             res.status(404).json({ message: "No entries found." });
//         }
//     } catch (err) {
//         res.status(500).json({ error: "Internal server error", details: err.message });
//     }
// };

export const getAllEntries = async (req, res) => {
    try {
        const stayuptothedateList = await Stayuptothedate.find();
        console.log("Fetched Data:", stayuptothedateList); // Debugging log

        if (stayuptothedateList.length > 0) {
            res.status(200).json(stayuptothedateList);
        } else {
            res.status(404).json({ message: "No entries found." });
        }
    } catch (err) {
        console.error("Error fetching entries:", err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};


// POST /stayuptothedate: Add a new entry
export const addEntry = async (req, res) => {
    try {
        const newUser = new Stayuptothedate(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({
            message: "User added successfully",
            userId: savedUser._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};




