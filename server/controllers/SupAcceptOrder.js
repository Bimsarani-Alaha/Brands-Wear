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



router.get("/showAcceptOrders", (req, res) => {
    Accept.find() // Fetch all accepted orders from the database
        .then(orders => res.json(orders))
        .catch(err => {
            console.error("Failed to fetch orders:", err);
            res.status(500).json({ error: 'Failed to fetch orders', details: err });
        });
});


router.get('/showOrdersbyuserId/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await Accept.find({ userId });
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put('/statusToYes/:itemCode', async (req, res) => {
    try {
      const { itemCode } = req.params;
  
      // Find the order by itemCode and update its status to 'yes'
      const updatedOrder = await Accept.findOneAndUpdate(
        { itemCode },            // Find order by itemCode
        { status: 'Yes' },       // Update the status field
        { new: true }            // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(updatedOrder); // Send the updated order as a response
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;


