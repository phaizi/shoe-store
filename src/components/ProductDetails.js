import React, { useContext} from 'react'
import { useLocation, useParams} from 'react-router-dom'
import { ProductsContext } from '../services/context';


export default function ProductsDetails(props) {
  const [products] = useContext(ProductsContext);
  const locObj = useLocation();
    // const {pathname} = useLocation();
    // const [product,setProduct] = useState({});
    const {productID} =  useParams()
    // let  productID= pathname.slice(10)
    // productID = productID.slice(-1)==='/' ? productID.slice(0,-1):productID;
    const [product] = products.filter((shoe)=>(productID === shoe.id))

    console.log('this is props detatile= ',props.location);
    console.log('this is location from details',locObj)
    
    return (
  <div>
        <h1>Products Details</h1>
        <img src={product?.media.imageUrl} alt="product"/>
  </div>

        
    
    );
  }
  