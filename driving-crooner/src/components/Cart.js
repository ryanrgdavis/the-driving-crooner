import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

function Cart({ removeItem }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                setCartItems(data.cartItems);
                setSelectedItems(data.cartItems.filter((item) => item.selected));
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
                fetch('http://localhost:3001/cart')
                    .then((response) => response.json())
                    .then((data) => {
                        setCartItems(data.cartItems);
                        setSelectedItems((prevItems) =>
                            prevItems.filter((item) => item.id !== itemId)
                        );
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const updateCartItemQuantity = (itemId, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === itemId) {
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const updateQuantityInCart = (item) => {
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
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {cartItems
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        quantity={item.quantity}
                        updateQuantity={updateCartItemQuantity}
                        removeItem={handleRemoveItem}
                    />
                ))}
            <p>Total Price: ${totalPrice}</p>
        </div>
    );
}

export default Cart;