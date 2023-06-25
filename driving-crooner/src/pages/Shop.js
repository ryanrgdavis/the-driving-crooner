import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Shop() {
    const [cartItems, setCartItems] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/cart')
            .then((response) => response.json())
            .then((data) => {
                const filteredItems = data.cartItems.filter((item) => item.id === 1 || item.id === 2);
                const uniqueItems = Array.from(new Set(filteredItems.map((item) => item.id))).map((id) => {
                    return filteredItems.find((item) => item.id === id);
                });
                setItems(uniqueItems);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const addToCart = (item) => {
        setSelectedItem(item);
        fetch(`http://localhost:3001/cart/item/${item.id}`)
            .then((response) => response.json())
            .then((data) => {
                const inventory = data.inventory - 1;
                fetch(`http://localhost:3001/cart/item/${item.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inventory, selected: true }),
                })
                    .then(() => {
                        fetch('http://localhost:3001/cart')
                            .then((response) => response.json())
                            .then((data) => {
                                const fetchedCartItems = data.cartItems;
                                const uniqueItems = Array.from(new Set(fetchedCartItems.map((item) => item.id))).map((id) => {
                                    return fetchedCartItems.find((item) => item.id === id);
                                });
                                setItems(uniqueItems);
                                setCartItems(fetchedCartItems);
                                setSelectedItems(fetchedCartItems.filter((item) => item.selected));
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                    })
                    .then(() => {
                        updateQuantityInCart(item);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const updateQuantityInCart = (item) => {
        fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then((response) => response.json())
            .then((data) => {
                setCartItems([...cartItems, data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/cart">Shopping Cart</Link>
            <h1>The Driving Crooner</h1>
            <h2>THE SHOP</h2>
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        <p>{item.name}</p>
                        <p>Price: ${item.price}</p>
                        <p>Inventory Remaining: {item.inventory}</p>
                        <button onClick={() => addToCart(item)} disabled={item.inventory === 0}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;
