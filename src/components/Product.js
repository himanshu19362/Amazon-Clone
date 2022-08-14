import React from 'react'
import '../assets/css/Product.css'
import { useStateValue } from '../ReactContextApi/StateProvider'

function Product({id , title , image , price , rating}) {
  let no = 0
  const [ , dispatch] =  useStateValue()
  const addToCart = ()=>{
    dispatch({
      type: 'ADD_TO_CART' , 
      item : {
        id , title , image , price , rating
      }
    })
  }
  return (
    <div className='product'>
        <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'><small>$</small><strong>{price}</strong></p>
            <div className='product__rating'>
                {Array(rating).fill().map(element => <p key={++no}>🌟</p>)}                                
            </div>            
        </div>
        <img src={image} alt='item'/>
        <button onClick={addToCart}>Add To Cart</button>
                
    </div>
  )
}

export default Product