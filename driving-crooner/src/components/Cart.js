import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cartItems }) {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>The Driving Crooner</h1>
            <h2>Shopping Cart</h2>
            {cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
            ))}
            <p>Total Price: ${totalPrice}</p>
            {/* Add functionality to remove items from the cart */}
        </div>
    );
}

export default Cart;
