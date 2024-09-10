const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare the password
        if (admin.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        } else {
            
            return res.status(200).json({ message: 'Login successful' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
