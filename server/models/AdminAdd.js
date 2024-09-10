const mongoose = require('mongoose');

// Define the schema for the Item
const itemSchema = new mongoose.Schema({
  category: String,
  size: String,
  price: Number,
  quantity: Number,
  availability: {
    type: String,
    default: "Available"
  },
  imageUrl: String,
}, { timestamps: true });

// Create the Item model
const Item = mongoose.model('items', itemSchema);

module.exports = Item;
