import React from 'react'
import {useAppSelector,useAppDispatch} from '../features/hooks'
import {logout} from '../features/user'
import {toggleNavDropdown} from '../features/dropdown'
import axios from 'axios'
import './css/Navbar.css'

export default function Navbar() {
    const pathName = window.location.pathname
    const user = useAppSelector(state => state.user.values)
    const dropdown = useAppSelector(state => state.dropdown)

    const dispatch = useAppDispatch()

    function handleLogout(){
        const requestOptions = { 
            headers:{'Content-Type':'application/json', 
            Authorization:`Token ${localStorage.getItem('token')}`
          }
        }

        axios.post('/api/auth/logout',null,requestOptions)

        .catch(error => {
            console.log(error)
        })

        dispatch(logout())
    }
    
    return (
        <div className='nav' id='head-nav'>
            <a href='/' id = 'firstcast'>FirstCast</a>
            <a href='/home' className = {pathName === '/home' || pathName === '/' ? 'active' : ''}>Home</a>
            <a href='/about' className = {pathName === '/about' ? 'active' : ''}>About</a>
            <a href='/contact' className = {pathName === '/contact' ? 'active' : ''}>Contact</a>

             {user.logged_in ?
             <div>
                  <div className = 'dropdown'> 
                <button id = 'navDropBtn' onClick={() => dispatch(toggleNavDropdown())}>My account</button>
                  {dropdown.navDropdownOn ?  
                    <div className = 'dropdown-content'>
                            {user.is_an_employer ? 
                             <>
                                <a href="/companies">My companies</a> 

                             </> 
                
                            : <>
                                <a href="/profile">My Profile</a>
                                <a href="/applied">My Jobs</a>
                              </>}
                         <a href = '/' onClick={handleLogout}>Logout</a>
                        </div> : null}
  
                  </div>
              </div>: 
              <a href='/login' className = {pathName === '/login' ? 'active' : ''}>Login</a>}
              {user.logged_in ? <p id = 'loggedinMessage'>Welcome, {user.email}</p> : null}
    

        </div>
    )
}