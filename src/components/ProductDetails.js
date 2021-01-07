import React from 'react'
import {useParams} from 'react-router-dom'


export default function ProductsDetails() {
    const params = useParams();
    console.log('this is params detatile= ',params);
    return (
  
        <h1>Products Details</h1>
        
    
    );
  }
  