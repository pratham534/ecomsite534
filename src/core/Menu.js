import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'

export default function Menu(history, path) {

    const navigate = useNavigate()

    function handleCart() {
        navigate('/cart')
    }
    function handleSignout() {
        signout()
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid d-flex justify-content-between">
                    <Link className="navbar-brand navbar-text text-black" to='/'>Shopical</Link>
                    <div className="collapse navbar-collapse gap-2" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-lg-0 d-flex">
                            {/* <li className="nav-item">
                                <Link className="nav-link" to='/'>Categories</Link>
                            </li> */}
                        </ul>
                        <form className="d-flex w-100 justify-content-between gap-2" role="search">
                            {/* <div className='w-50 d-flex gap-2'>
                                <input className="form-control w-100" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-dark" type="submit">Search</button>
                            </div> */}
                            <div className='w-auto d-flex gap-2'>
                                {(!isAuthenticated()) && <Link to='/signin'><button className="btn btn-outline-dark" type="submit">Login</button></Link>}
                                {(isAuthenticated()) && <button className="btn btn-outline-dark" onClick={handleCart}>Cart</button>}
                                {/* {(isAuthenticated()) && <button className="btn btn-outline-dark" onClick={()=>{
                                    navigate('/user/dashboard')
                                }}>Dashboard</button>} */}
                                {(isAuthenticated()) && <button className="btn btn-outline-dark" type="submit" onClick={handleSignout}>SignOut</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
