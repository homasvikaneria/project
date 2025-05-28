// just_home/Backend/Routes/ContactusRouter.js
// Routes/ContactusRouter.js

import express from 'express'
import { getAllContactus, postContactus } from '../Controller/ContactusController.js';
    
    const ContactusRouter = express.Router()

    ContactusRouter.get("/", getAllContactus)
    ContactusRouter.post("/", postContactus)
    
    export default ContactusRouter