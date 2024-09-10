// backend/models/ItemModel.js
const mongoose = require('mongoose');

// Define the schema for the Item
const itemSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Long Frocks", "Short Frocks", "Party Frocks", "Kids Frocks"],
    required: true,
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  availability: {
    type: String,
    enum: ["Available", "Unavailable"],
    default: "Available",
  },
  imageUrl: {
    type: String,
    default: "",  // You can store the image URL for the item, this field is optional
  },
}, { timestamps: true });

// Create the Item model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
