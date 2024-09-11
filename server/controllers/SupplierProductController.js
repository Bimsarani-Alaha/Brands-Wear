const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//post is a create part of crud
router.post("/AddProduct", (req, res) => {
    Product.create(req.body)
        .then(Product => res.json(Product))
        .catch(err => res.status(500).json(err));
});

module.exports = router;
