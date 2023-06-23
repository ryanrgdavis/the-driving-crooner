const express = require('express');
const cors = require('cors');
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

app.use(cors());

// Routes
app.get('/cart', (req, res) => {
    res.json({ cartItems });
});

app.post('/cart', (req, res) => {
    const newItem = req.body.item;
    cartItems.push(newItem);
    res.json({ cartItems });
});

app.listen(port, () => {
    console.log(`Server is listening here: http://localhost:${port}`);
});