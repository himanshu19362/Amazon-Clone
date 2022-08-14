import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../ReactContextApi/StateProvider'
import Order from './Order'
import '../assets/css/Orders.css'

function Orders() {
    const [orders , setOrders] = useState([])
    const[{user} , ] = useStateValue()
    useEffect(() => {

        if(user){
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created' , 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => {
                    return {
                        id:doc.id , 
                        data:doc.data()
                    }
                }))
            })
        }
        else{
            setOrders([])
        }
    } , [user])
  return (
    <div className='orders'>
        <h1>Orders Page</h1>
        <div className='orders__order'>
            {orders?.map(order => <Order order={order}/>)}
        </div>

    </div>
  )
}

export default Orders