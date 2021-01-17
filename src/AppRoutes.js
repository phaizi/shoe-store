import { Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound'
import Home from './components/Home'
import About from './components/About'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import Layout from './components/Layout'
import { CartContext, ProductsContext } from './services/context';
import { useEffect, useReducer, useState } from 'react';
import changeQuantity from './services/changeQuantity';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


export default function AppRoutes() {
  useEffect(()=>{

    async function fetchData(){
      try {
      const response = await fetch("https://api.thesneakerdatabase.com/v1/sneakers?"+ new URLSearchParams({'limit':'100', 'releaseDate': '2019-11-01'}))
      // const response = await fetch("https://covid19.mathdro.id/api?limit=100")
      const {results} = await response.json();
      // console.log('data is =',results)
      console.log('this is AppRoutes')
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
      // primary: {main: '#efb04b'},
      primary: {main: '#091714'},
      
      // secondary: {main:'#6b5a56'},
      secondary: {main:'#108393'},
    },
    // overrides: {
    //   MuiCssBaseline: {
    //     "@global": {
    //       body: {
    //         backgroundImage:
    //         "url(https://images.unsplash.com/photo-1609718581760-e7518a038f32?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)"
    //       }
    //     }
    //   }
    // }
  })

  return (
      <CartContext.Provider value={useReducer(changeQuantity, {total:0})}>
        <ProductsContext.Provider value={[productData, setProductData]}>
          <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:productID" element={<ProductDetails />} />
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