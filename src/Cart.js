import './App.css';
import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { state, addToCart, removeFromCart, decrementQuantity } = useContext(AppContext);

  const handleIncrement = (item) => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      decrementQuantity(item);
    } else {
      removeFromCart(item);
    }
  };

  // Initialize total_cost here
  let total_cost = 0;

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Shopping Cart</h2>
      {state.cartItems && state.cartItems.map((item, index) => {
        // Calculate the cost for each item
        const itemCost = parseFloat(item.price.replace(',', '')) * item.quantity;
        // Accumulate the cost for each item to total_cost
        total_cost += itemCost;

        return (
          <div key={index} style={{ marginBottom: '8px' }}>
            <img src={item.image} 
                 alt={`item${index + 1}`}
                 style={{ marginRight: '8px', marginBottom: '8px' }} />
            <div style={{ display: 'inline-block', marginRight: '8px' }}>
              <span>{item.name}</span>
              <span>{item.price}Br.</span>
            </div>
            <div style={{ display: 'inline-block', marginRight: '8px' }}>
              <button onClick={() => handleDecrement(item)} className={item.quantity === 1 ? 'del-btn' : 'inc-dec-btn'}>{item.quantity > 1 ? '-' : 'x'}</button>
              <input
                type='number'
                min={1}
                value={item.quantity}
                style={{ width: '50px', height: '25px' }}
              />
              <button onClick={() => handleIncrement(item)} className='inc-dec-btn' >+</button>
              <span className='cost'>Cost = {itemCost.toLocaleString()}Br.</span>
            </div>
          </div>
        );
      })}
        <div>
          {total_cost>0 ? <h3>Total Cost: {total_cost.toLocaleString()}Br.</h3>: <h3>No item added to the cart</h3>}
        </div>

        <div>
          <Link to='/shop'>
            <button style={{margin:'8px'}}>Add Item</button>
          </Link>
            <button style={{margin:'8px'}}>Buy Now</button>
        </div>
        
    </div>
  );
}
