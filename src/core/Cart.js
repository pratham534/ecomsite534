import React from 'react'
import Base from './Base'
import Card from './Card'
import { getCart } from './helper/carthelper'
import PaymentB from './PaymentB'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [reload, setReload] = React.useState(false)
  const [cart, setCart] = React.useState([])

  React.useEffect(()=>{
    setCart(getCart())
  },[reload])

  function RenderObjs() {
    let l = Object.keys(cart).length
    // console.log(l)
    if(l===0) return <p>Cart is Empty</p>
    const arr = cart.map((item, index) => {
      return (
        <Card key={index} item={item} add={false} reload={reload} setReload={setReload} />
      )
    })
    return arr
  }

  return (
    <Base title='Your Shopping Cart' description=''>
      <div className='row text-center mt-2 mb-2'>
        <div className='col-6'>
          <div>
            <h3>Products</h3>
          {(cart.length>0) && <p><Link to='/' className='additems'>Add More Items</Link></p>}
            <RenderObjs />
          </div>
        </div>
        <div className='col-6'>
          <div>
            <h3>Checkout</h3>
          </div>
          <div>
            {
              (cart.length > 0) ?
                (
                  <PaymentB
                    products={cart}
                    reload={reload}
                    setReload={setReload}
                  />
                ) :
                (
                  <p><Link to='/' className='additems'>Add Items</Link> to the cart and then Proceed</p>
                )
            }
          </div>
        </div>
      </div>
    </Base>
  )
}
