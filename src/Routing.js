import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './core/Home.js'
import Cart from './core/Cart.js'
import Signup from './user/Signup.js'
import Signin from './user/Signin.js'
import UserDashboard from './user/UserDashboard'
 
export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='' Component={Home} />
            <Route path='/signup' Component={Signup} />
            <Route path='/signin' Component={Signin} />
            <Route path='/cart' Component={Cart} />
            <Route path='/dashboard' Component={UserDashboard} />
            {/* private routing and conditional routing */}
            <Route path='/user/wishlist' Component={UserDashboard} />
        </Routes>
    </BrowserRouter>
  )
}