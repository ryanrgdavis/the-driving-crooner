import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart({ cartItems, removeItem }) {
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

    const handleRemoveItem = (itemId) => {
        fetch(`http://localhost:3001/cart/${itemId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setItems(items.filter((item) => item.id !== itemId));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {items.map((item, index) => (
                <CartItem key={index} item={item} removeItem={handleRemoveItem} />
            ))}
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;