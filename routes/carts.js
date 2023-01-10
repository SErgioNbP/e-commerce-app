const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// POST to add item to cart
router.post('/cart/products', async (req, res) => {
    
    let cart;
    if (!req.session.cartId) {
        cart = await cartsRepo.create({ items: [] });
        // add cart to cookie
        req.session.cartId = cart.id;
    } else {
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    // check if item in cart
    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if (existingItem) {
        // increment quantity
        existingItem.quantity++;
    } else {
        // add new product to items
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }

    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    res.send('Product added to cart');
});

// GET to show all items in cart


// POST to delete item from cart

module.exports = router;