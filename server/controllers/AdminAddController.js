const express = require('express');
const router = express.Router();
const Item = require('../models/AdminAdd');

router.post("/AddItem", (req, res) => {
      Item.create(req.body)
        .then(Item => res.json(Item))
        .catch(err => res.status(500).json(err));
});

module.exports = router;
