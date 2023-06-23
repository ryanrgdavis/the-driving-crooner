import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Shop() {
    const [cartItems, setCartItems] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                setItems(data.cartItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

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
            <Link to="/cart">Shopping Cart</Link>
            <p>Cart Inventory: {cartItems.length}</p> {/* Display cart inventory */}
            <h1>The Driving Crooner</h1>
            <h2>THE SHOP</h2>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>Price: ${item.price}</p>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;