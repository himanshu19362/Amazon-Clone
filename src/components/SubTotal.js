import React from 'react'
import '../assets/css/SubTotal.css'
import { useStateValue } from '../ReactContextApi/StateProvider'
import { getPrice } from '../ReactContextApi/reducer'
import { useNavigate } from 'react-router-dom'

function SubTotal() {
  const [{cart} , ] = useStateValue() 
  const navigate =  useNavigate()

  return (
    <div className='subtotal'>
        <div className='subtotal__box'>
            <p>Subtotal ({cart.length} Items) : <strong>${getPrice(cart)}</strong></p>
            <div className='subtotal__checkbox'>
                <input type={'checkbox'}/>
                <span>This order contains a gift</span>
            </div>
            <button className='subtotal__button' onClick={()=> navigate('/payment')}>Proceed To Checkout</button>

        </div>
    </div>
  )
}

export default SubTotal