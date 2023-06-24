import React from 'react';

function CartItem({ item, quantity, updateQuantity, removeItem }) {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

    return (
        <div>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity}</p>
            <input type="number" value={quantity} onChange={handleQuantityChange} />
        </div>
    );
}

export default CartItem;