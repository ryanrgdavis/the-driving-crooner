import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart({ cartItems, removeItem }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                const cartItems = data.cartItems;
                const uniqueItems = getUniqueItems(cartItems);
                setItems(uniqueItems);
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
                const updatedItems = items.filter(
                    (item, index) => item.id !== itemId || index === items.findIndex((i) => i.id === itemId)
                );
                setItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getUniqueItems = (items) => {
        const uniqueItems = [];
        const itemIds = [];

        items.forEach((item) => {
            if (!itemIds.includes(item.id)) {
                const quantity = items.filter((i) => i.id === item.id).length;
                uniqueItems.push({ ...item, quantity });
                itemIds.push(item.id);
            }
        });

        return uniqueItems;
    };

    const calculateQuantity = (itemId) => {
        return items.reduce((quantity, item) => {
            if (item.id === itemId) {
                return quantity + 1;
            }
            return quantity;
        }, 0);
    };

    const totalPrice = items.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {items
                .filter((item) => calculateQuantity(item.id) > 0) // Filter out items with quantity 0
                .map((item, index) => (
                    <CartItem
                        key={index}
                        item={item} // Add quantity property
                        removeItem={handleRemoveItem}
                        updateQuantity={() => setItems(getUniqueItems(cartItems))}
                    />
                ))}
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;