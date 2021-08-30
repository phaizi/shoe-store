import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Cart from './components/Cart'
import Layout from './components/Layout'
import { CartContext, ProductsContext } from './services/context';
import { useEffect, useReducer, useState } from 'react';
import changeQuantity from './services/changeQuantity';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ProdPagination from './components/ProdPagination';
import ProductsDetails from './components/ProductDetails';


export default function AppRoutes() {
  useEffect(()=>{

    async function fetchData(){
      try {
      const response = await fetch("https://v1-sneakers.p.rapidapi.com/v1/sneakers?"+ new URLSearchParams({'limit':'100', 'releaseDate': '2019-11-01'}),{headers: {
        'x-rapidapi-host': 'v1-sneakers.p.rapidapi.com',
    'x-rapidapi-key': 'ff08e7f7fcmsh6260d8fb0f6c656p1d6c04jsndd1e2becebf3'
      }})
      const {results} = await response.json();
      setProductData(results)
    } catch (err) {
      console.log('NETWORK ERROR')
      setProductData([])
    }
    };
    fetchData()
  },[])

  const [productData, setProductData] = useState([]);
  const theme= createMuiTheme ({
    palette: {
      primary: {main: '#091714'},
      secondary: {main:'#108393'},
    },
  })

  return (
      <CartContext.Provider value={useReducer(changeQuantity, {total:0})}>
        <ProductsContext.Provider value={[productData, setProductData]}>
          <ThemeProvider theme={theme}>
    
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="products" element={<ProdPagination />} >
              </Route>
              <Route path="/products/:productID" element={<ProductsDetails/>} />
              <Route path="cart" element={<Cart />} />
              <Route path="about" element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
         
          </ThemeProvider>
        </ProductsContext.Provider>
      </CartContext.Provider>
  );
}