const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    Category: String,
    userId: String,
    small: String,
    medium: String,
    large: String,
    extraLarge: String,
    Price: Number,
    totalPrice: Number, // This field will be updated in the pre-save hook
    Quantity: Number,
    itemName: String,
    itemCode: String,
    imgUrl: String,
    companyId: String,
    Status: { type: String, default: 'No' }, // Corrected syntax for default value
    companyName: String,
    deliveryDate: { type: Date }, // Added delivery date field
    date: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;
