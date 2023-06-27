import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import cigarImage from '../images/fedora.PNG';
import fedoraImage from '../images/cigar.PNG';

function Cart({ cigar, setCigar, fedora, setFedora }) {
    const [cartItems, setCartItems] = useState([]);
    const [bankBalance, setBankBalance] = useState(1000);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                const fetchedCartItems = data.cartItems;
                const uniqueItems = getUniqueItems(fetchedCartItems);
                setCartItems(uniqueItems);
                setItems(fetchedCartItems);
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
                        const fetchedCartItems = data.cartItems;
                        const uniqueItems = getUniqueItems(fetchedCartItems);
                        setCartItems(uniqueItems);
                        setItems(fetchedCartItems);
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
                uniqueItems[item.id] = { ...item, quantity: 1 };
            }
        });

        return Object.values(uniqueItems).filter((item) => item.quantity > 0);
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

    const totalPrice = cartItems.reduce((total, item) => total + (item.id === 1 ? cigar : fedora) * item.price * item.quantity, 0);

    const handlePurchase = () => {
        if (bankBalance >= totalPrice) {
            // Update the inventory in the API for the purchased items
            items.forEach((item) => {
                if (item.id === 1 && cigar > 0) {
                    fetch(`http://localhost:3001/cart/item/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ inventory: item.inventory - cigar }),
                    })
                        .then(() => {
                            setCigar(0);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                } else if (item.id === 2 && fedora > 0) {
                    fetch(`http://localhost:3001/cart/item/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ inventory: item.inventory - fedora }),
                    })
                        .then(() => {
                            setFedora(0);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                }
            });

            setBankBalance((prevBalance) => prevBalance - totalPrice);
            alert('Purchase successful!');
        } else {
            alert('Insufficient funds. Please add more balance.');
        }
    };

    const getItemImage = (itemId) => {
        if (itemId === 1) {
            return cigarImage;
        } else if (itemId === 2) {
            return fedoraImage;
        }
        return null;
    };

    return (
        <div className="cart-container">
            <nav className="navbar"></nav>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {cartItems
                .filter((item) => item.quantity > 0)
                .filter((item) => item.id !== 1 || cigar > 0)
                .filter((item) => item.id !== 2 || fedora > 0)
                .map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        imgSrc={getItemImage(item.id)}
                        quantity={item.id === 1 ? cigar : fedora}
                        updateQuantity={updateCartItemQuantity}
                        removeItem={handleRemoveItem}
                    />
                ))}
            <p>Total Price: ${totalPrice}</p>
            <p>Bank Balance: ${bankBalance}</p>
            <button onClick={handlePurchase} disabled={totalPrice > bankBalance}>
                Purchase
            </button>
        </div>
    );
}

export default Cart;