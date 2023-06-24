import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart({ removeItem }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                const fetchedCartItems = data.cartItems;
                const uniqueItems = getUniqueItems(fetchedCartItems);
                setCartItems(uniqueItems);
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
                // Update the items state by fetching the updated item list from the API
                fetch('http://localhost:3001/cart')
                    .then((response) => response.json())
                    .then((data) => {
                        const fetchedCartItems = data.cartItems;
                        const uniqueItems = getUniqueItems(fetchedCartItems);
                        setCartItems(uniqueItems);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getUniqueItems = (items) => {
        const uniqueItems = {};

        items.forEach((item) => {
            if (uniqueItems[item.id]) {
                uniqueItems[item.id].quantity += 1;
            } else {
                uniqueItems[item.id] = { ...item, quantity: item.quantity };
            }
        });

        return Object.values(uniqueItems).filter((item) => item.quantity > 0);
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {cartItems
                .filter((item) => item.quantity > 0)
                .map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        quantity={item.quantity}
                        removeItem={handleRemoveItem}
                    />
                ))}
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;
