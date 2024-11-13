import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import { router } from "./App"
import { CartProvider } from './components/ContextReducer';
import { TotalPriceProvider } from './components/TotalPriceContext';
import { ToastContainer } from 'react-toastify';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <TotalPriceProvider>
      <React.StrictMode>
        <RouterProvider router={router}>
        <ToastContainer 

        theme='dark'
        position='top-center'
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        
        
        />
          <App />
          
        </RouterProvider>
      </React.StrictMode>
    </TotalPriceProvider>
  </CartProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
