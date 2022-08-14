import React, { useEffect, useState } from 'react'
import '../assets/css/Payment.css'
import { useStateValue } from '../ReactContextApi/StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link , useNavigate } from 'react-router-dom'
import { CardElement ,  useElements, useStripe } from '@stripe/react-stripe-js'
import { getPrice } from '../ReactContextApi/reducer'
import axios from '../axios'
import { db } from '../firebase'

function Payment() {
  const [{cart , user} , dispatch] = useStateValue()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [succeeded , setSucceeded] = useState(false)
  const [error , setError] = useState(null)
  const [disabled , setDisabled] = useState(true)
  const [processing , setProcessing] = useState(false)
  const [clientSecret , setClientSecret] = useState(true)


  const handleSubmit = async (event) => {
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(clientSecret , {
        payment_method : {
            card : elements.getElement(CardElement)
        } ,       
        
    }).then(({paymentIntent}) => {
        setSucceeded(true)
        setError(null)
        setProcessing(false)
        

        db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
            cart:cart , 
            amount: paymentIntent.amount , 
            created: paymentIntent.created
        })

        dispatch({
            type:'EMPTY_CART'
        })

        navigate('/orders' , {replace:true})
        
    })
  }

  const handleChange = e => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  useEffect(()=>{
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post' , 
            url : `/payments/create?total=${getPrice(cart)*100}`
        })
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  } , [cart])

  console.log(clientSecret , 'Hi')

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>Checkout (<Link to={'/checkout'}>{cart?.length} Items</Link>)</h1>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles , CA</p>
                </div>
            </div>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review Items And Delivery</h3>
                </div>
                <div className='payment__items'>
                    {cart.map(item => <CheckoutProduct 
                        id={item.id} 
                        image={item.image} 
                        price={item.price} 
                        rating={item.rating} 
                        title={item.title}
                    />)}
                </div>
            </div>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>
                        <div className='payment__priceContainer'>
                            <h4>Order Total : ${getPrice(cart)}</h4>
                            <button disabled={disabled || processing || succeeded}>
                                <span>{processing ? <p>Processing</p>: 'Buy Now'}</span>
                            </button>
                        </div>

                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Payment