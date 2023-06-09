import React from 'react'
import { API } from '../../backend'
import { emptyCart } from '../../core/helper/carthelper'

export function signup(user) {
    return (
        fetch(`${API}user/`, {
            method: "POST",
            // 
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            // 
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    )
}

export function signin(user) {
    const formData = new FormData()

    for (const key in user) {
        formData.append(key, user[key])
    }
    return (
        fetch(`${API}user/login/`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .catch(err => console.log(err))
    )
}

export function authenticate(data) {
    localStorage.setItem("jwt", JSON.stringify(data))
}

export function isAuthenticated() {
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem("jwt"))
    }else {
        return false
    }
}

export function signout() {
    const userid = isAuthenticated() && isAuthenticated().user.id
    localStorage.removeItem("jwt")
    emptyCart()

    return (
        fetch(`${API}user/logout/${userid}`)
            .then(res => console.log("Logout Successful"))
            .catch(err => console.log(err))
    )
}