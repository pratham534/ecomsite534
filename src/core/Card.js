import React from 'react'
import ImageHelper from './helper/imagehelper'
import {addItemToCart, removeItemFromCart} from './helper/carthelper'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'


export default function Card({reload, setReload, ...props}) {
    const navigate = useNavigate()
    const item = props.item

    function addToCart() {
        if (isAuthenticated()){
            console.log("Added item ", item.id)
            addItemToCart(item)
            navigate('/cart')
        }else{
            console.log("Login first")
            navigate('/signin')
        }
    }

    function removeFromCart() {
        console.log("Removing item ", item.id)
        removeItemFromCart(item.id)
        setReload((reload)=>{
            return (!reload)
        })
    }

    return (
        <div className='m-2'>
            <div className="card card-com-1 m-auto">
                <ImageHelper item={item}/>
                <div className="card-body p-3">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text m-0 mt-1 mb-1">{item.desc}</p>
                    <p className="card-text m-0 mt-1 mb-1">Price : Rs. {item.price}</p>
                    {
                        props.add && <div className="btn btn-light border mt-3" onClick={addToCart}>Add to Cart</div>
                    }
                    {
                        !(props.add) && <div className="btn btn-light border mt-3" onClick={removeFromCart}>Remove from Cart</div>
                    }
                </div>
            </div>
        </div>
    )
}
