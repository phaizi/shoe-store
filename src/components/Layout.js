import React from 'react'
import { Link, Outlet } from 'react-router-dom';


export default function NotFound(){
    return (
      <div>
        <nav>
        <Link to="/">Home</Link> {' '}
        <Link to="/products">Products</Link> {' '}
        <Link to="/about">About</Link>
      </nav>
      <Outlet/>
      </div>
    )
}