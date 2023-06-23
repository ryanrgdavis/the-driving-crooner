const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

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