import React from 'react';

function CartItem({ item }) {
    return (
        <div>
            <p>{item.name}</p>
            <p>Price: ${item.price}</p>
            {/* Display other item details */}
        </div>
    );
}

export default CartItem;
