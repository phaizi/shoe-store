import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Layout from './components/Layout'

export default function AppRoutes() {
  return (
      <div>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home/>} />
        <Route path="products" element={<Products/>} />
        <Route path="products/:productID" element={<ProductDetails/>}/>
        <Route path="about" element={<About/>} />
        <Route path="cart" element={<Cart/>} />
        <Route path='*' element= {<NotFound/>} />
      </Route>
    </Routes>
      </div>
  );
}