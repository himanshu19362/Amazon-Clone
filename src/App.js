import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,  
} from "react-router-dom";
import Checkout from './components/Checkout';
import Login from './components/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './ReactContextApi/StateProvider';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';

function App() {
  const [ , dispatch] = useStateValue()
  const promise = loadStripe('pk_test_51LVnLDSC4edHBmxLMenhDp3jZ5acKw4BYvKaBr9QZpwsYnDI4RoWbPT3zftUjtu04k0QWLfZR6DpEnSPl2CpgdUq00IqRDHqvR')
  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("The User is " , authUser)

      if(auth){
        dispatch({
          type : 'SET_USER' , 
          user : authUser
        })
      }
      else{
        dispatch({
          type : 'SET_USER' , 
          user: null
        })
      }
    })
  } , [])
  return (
    <Router key={'router'}>
      <div className="app">     
        <Routes key={'routes'}>          
          <Route exact path="/" element={[<Header /> , <Home />]} />
          <Route exact path="/checkout" element={[<Header /> , <Checkout />]} /> 
          <Route exact path='/login' element={[<Header /> , <Login />]} /> 
          <Route exact path='/payment' element={[<Header /> , <Elements stripe={promise}><Payment /></Elements>]} />   
          <Route exact path='/orders' element={[<Header /> , <Orders />]} />     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
