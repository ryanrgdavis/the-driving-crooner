const express = require('express');
const app = express();
const port = 3001;

let cartItems = [
    {
        id: 1, name: `Cigar Decal
    [REQUIRED FOR JOB]`, price: 10, inventory: 999
    },
    {
        id: 2, name: `Fedora Decal
    [REQUIRED FOR JOB]`, price: 20, inventory: 999
    }
];

// Routes
app.get('/cart', (req, res) => {
    res.json({ cartItems });
});

app.post('/cart', (req, res) => {
    const newItem = req.body.item;
    cartItems.push(newItem);
    res.json({ cartItems });
});