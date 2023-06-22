import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import Cart from '../components/Cart';

function Shop() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
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
                    <p>Inventory: X</p>
                </div>
                <div>
                    <p>Item 2</p>
                    <p>Price: $X</p>
                    <button onClick={() => addToCart({ name: 'Item 2', price: 999 })}>Add to Cart</button>
                    <p>Inventory: X</p>
                </div>
                {/* Add more item entries */}
            </div>
            <Link to="/cart">View Cart</Link>
        </div>
    );
}

export default Shop;