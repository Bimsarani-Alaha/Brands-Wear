const express = require('express');
const router = express.Router();
const Accept = require('../models/AcceptOrder'); // Adjust as necessary

// Create an order (POST)
router.post("/AcceptOrders", (req, res) => {
    Accept.create(req.body)
        .then(order => res.json(order))
        .catch(err => {
            console.error("Failed to create order:", err);
            res.status(500).json({ error: 'Failed to add order', details: err });
        });
});

module.exports = router;
