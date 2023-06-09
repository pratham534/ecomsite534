import React from 'react'
import '../styles.css'
import Menu from './Menu'

export default function Base(
    {
        title = "Shopical",
        description = "A platform for all your accessories",
        children,
    }
) {

    return (
        <div>
            <Menu/>
            <div className='bg-dark text-light text-center p-5'>
                <div className='hero'>
                    <h1>{title}</h1>
                    <h3>{description}</h3>
                </div>
            </div>
            <div className={children}>
                <div className='content container'>
                    {children}
                </div>
            </div>
            <footer className="bg-dark text-center text-white">
                <div className='text-center p-3'><p className='m-auto'>Made with ❤ by Pratham</p></div>
                <div className="bg-black text-center p-3"> © 2023 Copyright Reserved <a className="text-white" href="https://www.linkedin.com/in/pratham-srivastava-062389224/">Shopical</a>
                </div>
            </footer>
        </div>
    )
}