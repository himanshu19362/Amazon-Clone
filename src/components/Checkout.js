import React from 'react'
import '../assets/css/Checkout.css'
import ad from '../assets/images/ad.jpg'
import { useStateValue } from '../ReactContextApi/StateProvider'
// import CheckoutProduct from '../CheckoutProduct'
import CheckoutProduct from './CheckoutProduct'
import SubTotal from './SubTotal'

function Checkout() {
    const [{cart} , ] = useStateValue()
  return (
    <div className='checkout'>
        <div className='checkout__left'>
            <img src={ad} className='checkout__ad' alt='ads' />
            <div>
                <h2 className='checkout__title'>Your Shopping Cart</h2>
            </div>
            {cart.map(element => <CheckoutProduct image = {element.image} title = {element.title} price = {element.price}  rating={element.rating} id={element.id} />)}
            {/* <CheckoutProduct /> */}

        </div>
        <div className='checkout__right'>
            <SubTotal />
        </div>
        
    </div>
  )
}

export default Checkout