import React from 'react';
import cigarImage from '../images/fedora.PNG';
import fedoraImage from '../images/cigar.PNG';

function CartItem({ item, quantity, updateQuantity, removeItem }) {
    const getItemImage = () => {
        if (item.id === 1) {
            return fedoraImage;
        } else if (item.id === 2) {
            return cigarImage;
        }
        return null;
    };

    return (
        <div>
            <p>{item.name}</p>
            <img src={getItemImage()} alt={item.name} className="item-image" />
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity}</p>
            {/* <button onClick={() => removeItem(item.id)}>Remove</button> */}
        </div>
    );
}

export default CartItem;