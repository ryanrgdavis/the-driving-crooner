import React from 'react';

function CartItem({ item, quantity }) {
    return (
        <div>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity}</p> {/* Use the 'quantity' prop */}
        </div>
    );
}

export default CartItem;