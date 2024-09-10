// backend/controllers/itemController.js
const Item = require('../models/ItemModel');

// Controller to add a new item
const addItem = async (req, res) => {
  const { category, size, price, quantity, availability, imageUrl } = req.body;

  // Validate input (you can add more validation as needed)
  if (!category || !size || !price || !quantity) {
    return res.status(400).json({ error: 'Please fill in all required fields' });
  }

  try {
    // Create a new item using the request data
    const newItem = new Item({
      category,
      size,
      price,
      quantity,
      availability,
      imageUrl
    });

    // Save the item to the database
    await newItem.save();
    res.status(201).json({ message: 'Item added successfully!', item: newItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item. Please try again later.' });
  }
};

// Controller to get all items (optional, to list all items)
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Controller to get a single item by ID (optional, if you want to view an individual item)
const getItemById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const item = await Item.findById(id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// Controller to update an item (optional, if you want to allow item updates)
const updateItem = async (req, res) => {
  const { id } = req.params;
  const { category, size, price, quantity, availability, imageUrl } = req.body;
  
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, {
      category, size, price, quantity, availability, imageUrl
    }, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully!', item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Controller to delete an item (optional, if you want to allow item deletion)
const deleteItem = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

module.exports = {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
