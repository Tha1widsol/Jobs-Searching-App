import React from 'react'
import { useAppSelector,useAppDispatch} from '../Global/features/hooks'
import {logout} from '../Global/features/user'
import axios from 'axios'

export default function Navbar() {
    const pathName = window.location.pathname
    const user = useAppSelector((state) => state.user.values)
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
            <a href='/' id = 'firstcast' >FirstCast</a>
            <a href='/home' className = {pathName === '/home' || pathName === '/' ? 'active' : ''}>Home</a>
            <a href='/about' className = {pathName === '/about' ? 'active' : ''}>About</a>
            <a href='/contact' className = {pathName === '/contact' ? 'active' : ''}>Contact</a>
             {user.logged_in ?
             <div>
                  <p id = 'loggedinMessage'>Welcome, {user.email}</p> 
                  <a href = '/' onClick={handleLogout}>Logout</a>
              </div>: 
              <a href='/login' className = {pathName === '/login' ? 'active' : ''}>Login</a>}
    
        </div>
    )
}