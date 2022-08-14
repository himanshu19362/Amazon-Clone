import React from 'react'
import '../assets/css/Header.css'
import logo from '../assets/images/amazon_logo.png'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom'
import { useStateValue } from '../ReactContextApi/StateProvider'
import { auth } from '../firebase';

function Header() {
    const [ {cart , user} , ] = useStateValue();
    const handleSignOut = ()=> {
        if(user){
            auth.signOut()
        }
    }
  return (
    <div className='header'>
        <Link to={'/'}>
            <img src={logo} className='header__logo' alt='logo' />
        </Link>
        <div className='header__search'>
            <input type={'text'} className='header__searchInput' />
            <SearchIcon className='header__searchIcon' />
            
        </div> 
        <div className='header__nav'>
            <Link to={!user &&'/login'} style={{ textDecoration: 'none' }}>
                <div className='header__options' onClick={handleSignOut}>
                
                    <span className='header__optionLine1'>
                        Hello {user ? user.email : 'Guest'}
                    </span>
                    <span className='header__optionLine2'>
                        {user ? 'Sign Out' : 'Sign In'}
                    </span>
                

                </div>
            </Link>

            <Link to={'/orders'}>
            
                <div className='header__options'>  
                    <span className='header__optionLine1'>
                        Returns
                    </span> 
                    <span className='header__optionLine2'>
                        And Orders
                    </span>            

                </div>
            </Link>
            <div className='header__options'> 
                <span className='header__optionLine1'>
                    Your
                </span>       
                <span className='header__optionLine2'>
                    Prime
                </span>        

            </div>
            <Link to={'/checkout'} style={{ textDecoration: 'none' }}>
                <div className='header__optionBasket'>
                    <ShoppingBasketIcon />
                    <span className='header__optionLine2 header__basketCount'>{cart?.length}</span>

                </div>
            </Link>

        </div>
    </div>
  )
}

export default Header