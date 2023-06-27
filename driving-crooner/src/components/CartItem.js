import React from 'react';
import cigarImage from '../images/fedora.PNG';
import fedoraImage from '../images/cigar.PNG';

function CartItem({ item, quantity, updateQuantity, removeItem }) {
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateQuantity(item.id, newQuantity);
        }
    };

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
            <img src={getItemImage()} alt={item.name} />
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity}</p>
            <input type="number" value={quantity} onChange={handleQuantityChange} />
            {/* <button onClick={() => removeItem(item.id)}>Remove</button> */}
        </div>
    );
}

export default CartItem;