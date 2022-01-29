import React,{useState} from 'react'
import {useAppSelector,useAppDispatch} from '../features/hooks'
import {logout} from '../features/user'
import axios from 'axios'
import './css/Navbar.css'

export default function Navbar() {
    const pathName = window.location.pathname
    const user = useAppSelector(state => state.user)
    const email = sessionStorage.getItem('email')
    const [dropdown,setDropdown] = useState(false)

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

             {user.loggedIn ?
             <div>
                <div className = 'dropdown'> 
                <button id = 'navDropBtn' onClick={() => setDropdown(!dropdown)}>My account</button>
                  {dropdown ?  
                    <div className = 'dropdown-content'>
                            {user.user.isAnEmployer ? 
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
              {user.loggedIn ? <p id = 'loggedinMessage'>Welcome, {email}</p> : null}
        </div>
    )
}