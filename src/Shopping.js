import React, { useContext } from 'react';
import { AppContext } from './AppContext';

export default function Shopping() {
  const { state, addToCart } = useContext(AppContext);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Product lists</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', justifyContent: 'center' }}>
        {state.itemsForSale.map((item, index) => (
          <div key={index} style={{ textAlign: 'center', margin: '20px' }}>
            <img
              src={item.image}
              alt={`item${index + 1}`}
              style={{
                width: '250px',
                height: '200px',
                margin: '10px',
                alignItems: 'center',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)', // Add box-shadow
                transition: 'box-shadow 0.3s ease-in-out', // Add transition for smooth effect
              }}
              onMouseEnter={(e) => (e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)')} // Add hover effect
              onMouseLeave={(e) => (e.target.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)')} // Remove hover effect
            />
            <div>
              <span>{item.name}</span>
              <span>{item.price}Br.</span>
              <button className='btn1' onClick={() => addToCart(item)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
