const express = require('express');
const router = express.Router();
const Item = require('../models/AdminAdd');

// Route to add an item
router.post("/AddItem", async (req, res) => {
  try {
    const { itemCode } = req.body;

    // Check if an item with the same code already exists
    const existingItem = await Item.findOne({ itemCode });

    if (existingItem) {
      return res.status(400).json({ message: "Item code already exists!" });
    }

    // If not, create the new item
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
//Update Admin Items
// Route to update item quantity in inventory
router.put("/updateInventory/:itemId", async (req, res) => {
  try {
    const { quantity } = req.body; // New quantity to add
    const item = await Item.findById(req.params.itemId);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Calculate the new quantity
    const newQuantity = item.quantity + quantity;

    // Update the item with the new quantity
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemId,
      { quantity: newQuantity },
      { new: true }
    );

    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to update inventory", details: err });
  }
});

router.post('/UpdateInventoryByOrders', async (req, res) => {
  try {
    const { itemCode, small, medium, large, extraLarge } = req.body;

    // Find the inventory item by itemCode
    const inventoryItem = await Item.findOne({ itemCode });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Update the sizes by adding the new quantities from the order
    inventoryItem.small += small || 0;
    inventoryItem.medium += medium || 0;
    inventoryItem.large += large || 0;
    inventoryItem.extraLarge += extraLarge || 0;

    // Save the updated inventory item
    await inventoryItem.save();

    res.status(200).json({ message: 'Inventory updated successfully', inventoryItem });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to delete an item
router.delete("/deleteItem/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  Item.findByIdAndDelete(itemId)  // Find item by ID and delete it
    .then(deletedItem => {
      if (!deletedItem) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json({ message: "Item deleted successfully" });
    })
    .catch(err => res.status(500).json(err));
});


// Checkout route
router.post('/checkoutInventoryByOrders', async (req, res) => {
  try {
    const { itemCode, small, medium, large, extraLarge } = req.body;

    // Find the inventory item by itemCode
    const inventoryItem = await Item.findOne({ itemCode });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Update the sizes by adding the new quantities from the order
    inventoryItem.small -= small || 0;
    inventoryItem.medium -= medium || 0;
    inventoryItem.large -= large || 0;
    inventoryItem.extraLarge -= extraLarge || 0;

    // Save the updated inventory item
    await inventoryItem.save();

    res.status(200).json({ message: 'Inventory updated successfully', inventoryItem });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

