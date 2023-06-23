import React from 'react';

function CartItem({ item }) {
    return (
        <div>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
        </div>
    );
}

export default CartItem;