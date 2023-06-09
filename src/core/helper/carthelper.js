import React from 'react'

export function addItemToCart(item) {
    // const prod = props.prod
    let cartData = []
    if(localStorage.getItem("cart")){
        cartData = JSON.parse(localStorage.getItem("cart"))
    }
    cartData.push({
        ...item
    })
    localStorage.setItem("cart", JSON.stringify(cartData))
}

export function removeItemFromCart(itemid) {
    let cartData = []
    let ct = 0
    if(typeof window !== undefined){
        if(localStorage.getItem("cart")){
            cartData = JSON.parse(localStorage.getItem("cart"))
        }
        cartData.map((item, i)=>{
            if(item.id === itemid && ct === 0){
                cartData.splice(i,1)
                ct++
            }
            else{
                return item
            }
        })
        localStorage.setItem("cart", JSON.stringify(cartData))
    }
    return cartData
}


export function emptyCart(){
    if(typeof window !== undefined){
        localStorage.removeItem("cart")
        let cartData = []
        localStorage.setItem("cart", JSON.stringify(cartData))
    }
}

export function getCart(){
    if(typeof window !== undefined){
        return JSON.parse(localStorage.getItem("cart"))
    }
}