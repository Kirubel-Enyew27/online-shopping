import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Shopping from './Shopping';
import Cart from './Cart';

export default function Home() {
  return (
    <Router>
      <div>
        <ul style={{ listStyleType: 'none', display: 'inline-flex', backgroundColor: '#70ffae', border: '1px solid #658769', width: '80%' }}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
          </li>
          <li>
            <Link to='/cart'>
              {/* Use the cart icon from FontAwesome */}
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </li>
          <li style={{ marginLeft: 'auto' }}>
            <Link to='/logout'>Log Out</Link>
          </li>
        </ul>
        <Routes>
          <Route path='/' />
          <Route path='/shop' element={<Shopping />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}
