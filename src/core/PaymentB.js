import React from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper/index'
import { getToken, processPayment } from './helper/paymenthelper'
import { createOrder } from './helper/orderhelper.js'
import { emptyCart } from './helper/carthelper'

import DropIn from 'braintree-web-drop-in-react'

export default function PaymentB({ reload, setReload, ...props }) {

  const products = props.products

  const [info, setInfo] = React.useState({
    clientToken: null,
    error: "",
    success: false,
  })

  const [dropInInstance, setDropInInstance] = React.useState(null);

  const navigate = useNavigate()

  const userid = isAuthenticated && isAuthenticated().user.id
  const token = isAuthenticated && isAuthenticated().token

  function getMeToken(userid, token) {
    getToken(userid, token)
      .then((res) => {
        if (res.error) {
          setInfo({
            ...info,
            error: res.error,
          })
          signout()
          navigate('/')
        }
        else {
          const clientToken = res.clientToken
          setInfo({ clientToken })
        }
      })
  }

  React.useEffect(() => {
    getMeToken(userid, token)
  }, [])

  function getAmount() {
    let amt = 0
    products.map((item) => {
      amt = amt + parseFloat(item.price)
    })
    return amt
  }


  function onPurchase() {
    let nonce
    // console.log(dropInInstance)
    dropInInstance.requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce
        // console.log(nonce)
        const paymentData = {
          "paymentMethodNonce": nonce,
          "amount": getAmount()
        }
        processPayment(userid, token, paymentData)
          .then((res) => {
            // console.log(res)
            if (res.error) {
              console.log("PAYMENT FAILED")
              signout()
              navigate('/signin')
            } else {
              setInfo({
                ...info,
                success: res.success,
              })
              console.log("PAYMENT SUCCESSFUL")
              let product_names = ""
              products.forEach((item) => {
                product_names += item.name + ", "
              })
              // console.log(product_names)
              const orderData = {
                "products": product_names,
                "transaction_id": res.transaction.id,
                "amount": res.transaction.amount
              }
              // console.log(orderData)
              createOrder(userid, token, orderData)
                .then((response) => {
                  // console.log(response)
                  if (response.error) {
                    console.log("ORDER FAILED ", response.error)
                    signout()
                    navigate('/signin')
                  }
                  else {
                    if (response.success === true) {
                      console.log('ORDER SUCCESSFUL')
                    }
                  }
                })
                .catch((errr) => {
                  setInfo({
                    ...info,
                    success: false
                  })
                  console.log("ORDER ERR ", errr)
                })
              emptyCart()
              setReload((!reload))
            }
          })
          .catch(err => console.log("PAYMENT ERR ", err))
      })
      .catch(e => console.log("NONCE ERR ", e))
  }

  function showDropIn() {
    return (
      <div>
        {
          (info.clientToken !== null && Object.keys(products).length > 0) ?
            (
              <div className='container w-100 m-0'>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={(instance) => setDropInInstance(instance)}
                >
                </DropIn>
                <button onClick={onPurchase} className='btn btn-dark w-50'>Proceed to Payment</button>
              </div>
            ) :
            (
              <p>Please login first</p>
            )
        }
      </div>
    )
  }

  return (
    <div>
      <div className='container w-100 m-0'>
        <p className='m-0 p-0 bill'>Current Bill is : ${getAmount()}</p>
      </div>
      {showDropIn()}
    </div>
  )
}
