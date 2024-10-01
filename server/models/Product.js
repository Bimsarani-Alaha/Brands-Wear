const mongoose = require ('mongoose')

const ProductSchema = new mongoose.Schema({

        Category: String,
        small: String,
        medium: String,
        large: String,
        extraLarge: String,
        Price: Number,
        Quantity: Number,
        itemName: String,
        itemCode: String,
        imageURL: String,
        
})

const ProductModel = mongoose.model("products",ProductSchema)
module.exports = ProductModel

     