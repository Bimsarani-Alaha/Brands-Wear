const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a product (POST)
router.post("/AddProduct", (req, res) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(err => res.status(500).json({ error: 'Failed to add product', details: err }));
});

// Update a product (PUT)
router.put("/UpdateProduct/:itemCode", (req, res) => {
    const itemCode = req.params.itemCode;
    const updatedData = req.body;

    Product.findOneAndUpdate({ itemCode }, updatedData, { new: true, runValidators: true })
        .then(updatedProduct => {
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(updatedProduct);
        })
        .catch(err => res.status(500).json({ error: 'Failed to update product', details: err }));
});

// Show Supplier Products (GET)
router.get("/showSupplierProducts", (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ error: 'Failed to fetch products', details: err }));
});

// Show Supplier Product by ID (GET)
router.get("/showSupplierProductsById/:itemId", (req, res) => {
    const itemId = req.params.itemId;

    Product.findOne({ _id: itemId })
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        })
        .catch(err => res.status(500).json({ error: 'Failed to fetch product', details: err }));
});

// Delete a product (DELETE)
router.delete("/deleteProduct/:productId", (req, res) => {
    const { productId } = req.params;

    Product.findByIdAndDelete(productId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully!', deletedProduct });
        })
        .catch(err => res.status(500).json({ error: 'Failed to delete product', details: err }));
});

module.exports = router;
