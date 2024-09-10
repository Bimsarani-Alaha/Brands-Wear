const mongoose = require ('mongoose')

const ProductSchema = new mongoose.Schema({

        Category: String,
        Size: String,
        Prize: Number,
        Quantity: Number,
        
})

const ProductModel = mongoose.model("products",ProductSchema)
module.exports = ProductModel

     