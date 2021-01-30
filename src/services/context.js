import { createContext } from 'react';

const ProductsContext = createContext([]); // use in products, productsdetails
const CartContext = createContext(); // use in products, productsdetails, cart

export { ProductsContext, CartContext }