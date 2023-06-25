import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Checkout({ cartItems }) {
    const [bankBalance, setBankBalance] = useState(1000);
    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    const handlePurchase = () => {
        if (bankBalance >= totalPrice) {
            setBankBalance((prevBalance) => prevBalance - totalPrice);
            alert('Purchase successful!');
            // You can clear the cart here if needed
        } else {
            alert('Insufficient funds. Please add more balance.');
        }
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/shop">The Shop</Link>
            <h1>The Driving Crooner</h1>
            <h2>Checkout</h2>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Subtotal: ${item.quantity * item.price}</p>
                </div>
            ))}
            <p>Total Price: ${totalPrice}</p>
            <p>Bank Balance: ${bankBalance}</p>
            <button onClick={handlePurchase}>Purchase</button>
        </div>
    );
}

export default Checkout;