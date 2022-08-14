import moment from 'moment'
import React from 'react'
import '../assets/css/Order.css'
import CheckoutProduct from './CheckoutProduct'

function Order({order}) {
  return (
    <div className='order'>
        <h2>Order</h2>
        <p>{moment.unix(order.data.created).format('MMMM Do YYYY , h:mma')}</p>
        <p className='order__id'>
            <small>{order.id}</small>
        </p>
        {order.data.cart.map(item => <CheckoutProduct hideButton={true} id={item.id} image={item.image} title={item.title} price={item.price} 
            rating={item.rating}
        />)}
        <p className='order__total'>${order.data.amount / 100}</p>

    </div>
  )
}

export default Order