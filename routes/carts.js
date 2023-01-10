const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

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

    try {
        await cartsRepo.update(cart.id, { items: cart.items });
    } catch (err) {
        return res.send('Could not find cart');
    }    

    res.redirect('/cart');
});

// GET to show all items in cart
router.get('/cart', async (req, res) => {
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    const cart = await cartsRepo.getOne(req.session.cartId);

    for (let item of cart.items) {
        const product = await productsRepo.getOne(item.id);
        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }));
});

// POST to delete item from cart
router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    try {
        await cartsRepo.update(req.session.cartId, { items });
    } catch (err) {
        return res.send('Could not find cart');
    }

    res.redirect('/cart');
});

module.exports = router;