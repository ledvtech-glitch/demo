import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './styles/globals.css';
import Home from './routes/Home';
import Category from './routes/Category';
import Product from './routes/Product';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Account from './routes/Account';
import Admin from './routes/Admin';
import Vendor from './routes/Vendor';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category/:categoryId', element: <Category /> },
      { path: 'product/:productId', element: <Product /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'account', element: <Account /> },
      { path: 'admin', element: <Admin /> },
      { path: 'vendor', element: <Vendor /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
