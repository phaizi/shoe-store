import React from 'react'
import {useParams, useLocation} from 'react-router-dom'

export default function Products(props) {
    let location = useLocation();
    console.log('thisi is location= ',location)
    // let History = useHistory();
    // console.log('thisi is History= ',History)
    const params = useParams();
    console.log('this is params 2= ',params);
    console.log('this is props= ',props)
    return (
        <h1>Products</h1>
        
    
    );
  }
  