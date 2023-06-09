import React from 'react'
import getProducts from './helper/coreapicalls'
import Base from './Base'
import Card from './Card'


export default function Home() {

  const [products, setProducts] = React.useState([])

  function loadAllProducts() {
    getProducts()
      .then((data) => {
        setProducts(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    loadAllProducts()
  }, [])

  function RenderObjs() {
    const arr = products.map((item, index) => {
      return (
        <Card key={index} item={item} add={true} />
      )
    })
    return arr
  }

  return (
    <Base>
      <div className='m-auto'>
        <h3 className='text p-2 m-2 mb-0'>Products</h3>
      </div>
      <div className='card-com p-2 pt-0 pb-0'>
        <RenderObjs />
      </div>
    </Base>
  )
}
