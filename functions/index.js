const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51LVnLDSC4edHBmxLdZLkIhijhqyl5tHcK7VX0mcgWnyj3Z5cPvp1lgynhrlSYOh46YiRND4iohOGuskaQS6xlKyF00Pnpgc3Q9')


const app = express()

app.use(cors({
    origin : true
}))

app.use(express.json())

app.get('/' , (request , response) => {
    response.status(200).send('Hello World')
})

app.post('/payments/create' , async (request , response) => {
    const total = request.query.total
    console.log("payment of " + total + " received . BOOM !!!")

    const paymentIntent = await stripe.paymentIntents.create({
        amount : total , 
        currency : "INR" ,
    })

    response.status(201).send({
        clientSecret : paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app)