import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Shop() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then((response) => response.json())
            .then((data) => {
                setCartItems([...cartItems, data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <Link to="/">Home</Link>
            <h1>The Driving Crooner</h1>
            <h2>THE SHOP</h2>
            <div>
                <div>
                    <p>Item 1</p>
                    <p>Price: $X</p>
                    <button onClick={() => addToCart({ name: 'Item 1', price: 999 })}>Add to Cart</button>
                </div>
                <div>
                    <p>Item 2</p>
                    <p>Price: $X</p>
                    <button onClick={() => addToCart({ name: 'Item 2', price: 999 })}>Add to Cart</button>
                </div>
                {/* Add more item entries */}
            </div>
            <p>Cart Inventory: X</p>
            <Link to="/cart">View Cart</Link>
        </div>
    );
}

export default Shop;