import React, { createContext, useReducer } from 'react';
import item1 from './assets/camera.jpeg';
import item2 from './assets/desktop.jpeg';
import item3 from './assets/dish.jpeg';
import item4 from './assets/iphone.jpeg';
import item5 from './assets/LED_light.jpeg';
import item6 from './assets/macbook.jpeg';
import item7 from './assets/modem.jpeg';
import item8 from './assets/sensor.jpeg';
import item9 from './assets/speaker.jpeg';

const AppContext = createContext();

const initialState = {
    itemsForSale: [
      { name: 'Camera', id: 1, price: '10,000', image: item1 },
      { name: 'Desktop', id: 2, price: '17,000', image: item2 },
      { name: 'Dish', id: 3, price: '3,000', image: item3 },
      { name: 'i-phone', id: 4, price: '100,000', image: item4 },
      { name: 'LED_light', id: 5, price: '8,500', image: item5 },
      { name: 'Macbook', id: 6, price: '120,000', image: item6 },
      { name: 'Modem', id: 7, price: '2,000', image: item7 },
      { name: 'Sensor', id: 8, price: '4,000', image: item8 },
      { name: 'Speaker', id: 9, price: '2,800', image: item9 },
    ],
    cartItems: [],
  };  

const appReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const itemToAdd = action.payload;
        // Check if the item is already in the cart
        const isItemInCart = state.cartItems.find((item) => item.id === itemToAdd.id);
  
        if (!isItemInCart) {
          return {
            ...state,
            cartItems: [...state.cartItems, { ...itemToAdd, quantity: 1 }],
          };
        }
  
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
  
        case 'REMOVE_FROM_CART':
          return {
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
          };

        case 'DECREMENT_QUANTITY':
          return {
            ...state,
            cartItems: state.cartItems.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
    
        default:
          return state;
    }
  };

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  const decrementQuantity = (item) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: item });
  };

  return (
    <AppContext.Provider value={{ state, addToCart, removeFromCart, decrementQuantity }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
