const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Supplier = require('../models/Supplier');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email is associated with an admin
        const admin = await Admin.findOne({ email });

        if (admin) {
            // Check if the admin's password matches
            if (admin.password === password) {
                return res.status(200).json({ message: 'Admin login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid admin credentials' });
            }
        }

        // Check if the email is associated with a supplier
        const supplier = await Supplier.findOne({ email });

        if (supplier) {
            // Check if the supplier's password matches
            if (supplier.password === password) {
                return res.status(202).json({ message: 'Supplier login successful' });
            } else {
                return res.status(401).json({ message: 'Invalid supplier credentials' });
            }
        }

        // If neither admin nor supplier is found
        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
