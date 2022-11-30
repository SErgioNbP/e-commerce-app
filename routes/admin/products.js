const express = require('express');

const router = express.Router();

router.get('/admin/products', (req, res) => {
    //res.send(productsTemplate({}));
});

router.get('/admin/products/new', (req, res) => {
    //res.send(productsTemplate({}));
});

module.exports = router;