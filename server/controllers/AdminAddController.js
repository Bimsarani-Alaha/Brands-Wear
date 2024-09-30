const express = require('express');
const router = express.Router();
const Item = require('../models/AdminAdd');

// Route to add an item
router.post("/AddItem", (req, res) => {
  Item.create(req.body)
    .then(item => res.json(item))
    .catch(err => res.status(500).json(err));
});

// Route to show all products (items)
router.get("/showCustomer", (req, res) => {
  Item.find()  // Fetch all items from the database
    .then(items => res.json(items))
    .catch(err => res.status(500).json(err));
});

// Route to show a product by ID
router.get("/showCustomerById/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  Item.findById(itemId)  // Fetch item by ID from the database
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: "Item not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
