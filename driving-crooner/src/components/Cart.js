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
                const updatedItems = cartItems.filter(
                    (item) => item.id !== itemId || cartItems.findIndex((i) => i.id === itemId) !== -1
                );
                setCartItems(updatedItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const getUniqueItems = (items) => {
        const uniqueItems = [];
        const itemIds = [];

        items.forEach((item) => {
            const existingItem = uniqueItems.find((uniqueItem) => uniqueItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                uniqueItems.push({ ...item, quantity: 1 });
            }
            itemIds.push(item.id);
        });

        return uniqueItems;
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {cartItems.map((item) => {
                const quantity = cartItems.filter((cartItem) => cartItem.id === item.id).length;
                return (
                    <CartItem
                        key={item.id}
                        item={item}
                        quantity={item.quantity}
                        // quantity={cartItems.filter((cartItem) => cartItem.id === item.id).length} // Pass quantity prop
                        removeItem={handleRemoveItem}
                    />
                );
            })}
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;
