import React, { useState } from 'react'
import '../assets/css/Login.css'
import logo from '../assets/images/amazon.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

function Login() {

  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const navigate = useNavigate()
  
  const handleLogin = e => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email , password)
    .then(auth => {
        navigate('/')
    })
    .catch(err => alert(err.message))
  }

  const register = e => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email , password)
    .then(auth => {
        console.log(auth)
        if(auth)    navigate('/')
    })
    .catch(err => alert(err.message))
  }
  return (
    <div className='login' >
        <Link to="/">
            <img src={logo} className='login__logo' alt='logo' />
        </Link> 
        <div className='login__container'>
            <h1>Sign-In</h1>
            
            <form>
                <h5>Email</h5>
                <input type={'email'} value={email} onChange = {e => setEmail(e.target.value)} />
                <h5>Password</h5>
                <input type={'password'} value={password} onChange = {e => setPassword(e.target.value)} />
                <button type='submit' onClick={handleLogin} className='login__signInButton'>Sign In</button>
            </form>


            <p>By signing-in you agree to Amazon's FAKE CLONE Conditions of Use &
                Sale. Please see our Privacy Notice, our Cookies Notice and our
                Interest-Based Ads
            </p>
            <button className='login__registerButton' onClick={register}>Create Your Amazon Account .</button>
        </div>       

    </div>
  )
}

export default Login