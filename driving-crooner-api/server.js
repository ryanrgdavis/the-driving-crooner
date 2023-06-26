const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

let cartItems = [
    {
        id: 1,
        name: 'Cigar Decal [REQUIRED FOR JOB]',
        price: 10,
        inventory: 999
    },
    {
        id: 2,
        name: 'Fedora Decal [REQUIRED FOR JOB]',
        price: 20,
        inventory: 999
    }
];

app.use(cors());
app.use(express.json());

// Routes
app.get('/cart', (req, res) => {
    res.json({ cartItems });
});

app.get('/cart/item/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const item = cartItems.find((item) => item.id === parseInt(itemId));

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.patch('/cart/item/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    const { inventory } = req.body;
    const itemIndex = cartItems.findIndex((item) => item.id === parseInt(itemId));

    if (itemIndex !== -1) {
        cartItems[itemIndex].inventory = inventory;
        res.json(cartItems[itemIndex]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

app.post('/cart', (req, res) => {
    const newItem = req.body;
    const existingItem = cartItems.find((item) => item.id === newItem.id);

    if (existingItem) {
        existingItem.inventory = newItem.inventory;
    }

    res.json(newItem);
});

app.listen(port, () => {
    console.log(`Server is listening here: http://localhost:${port}`);
});

if (process.env.NODE_ENV === 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}