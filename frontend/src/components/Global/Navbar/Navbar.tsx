import React,{useState} from 'react'
import {useAppSelector,useAppDispatch} from '../features/hooks'
import {token,logout} from '../features/Auth/user'
import axios from 'axios'
import './css/Navbar.css'

export default function Navbar() {
    const pathName = window.location.pathname
    const user = useAppSelector(state => state.user)
    const [dropdown,setDropdown] = useState(false)

    const dispatch = useAppDispatch()
    
    function handleLogout(){
        const requestOptions = { 
            headers: { 
            Authorization:`Token ${token}`
          }
        }
        axios.post('/api/auth/logout',null,requestOptions)
        .catch(error => {
            console.log(error)
        })

        dispatch(logout())

    }
    
    return (
        <div className = 'nav' id = 'head-nav'>
            <a href='/' id = 'firstcast'>FirstCast</a>
            <a href='/home' className = {pathName === '/home' || pathName === '/' ? 'active' : ''}>Home</a>
            <a href='/about' className = {pathName === '/about' ? 'active' : ''}>About</a>
            <a href='/contact' className = {pathName === '/contact' ? 'active' : ''}>Contact</a>

             {user.isLoggedIn ?
             <div>
                <div className = 'dropdown'> 
                <button id = 'navDropBtn' onClick={() => setDropdown(!dropdown)}>My account</button>
                  {dropdown ?  
                    <div className = 'dropdown-content'>
                            {user.values?.isAnEmployer ? 
                             <>
                                <a href = '/companies'>My companies</a> 
                                <a href = '/jobs'>My jobs</a> 


                             </> 
                
                            : <>
                                <a href ={`/profile/${user.values?.id}`}>My Profile</a>
                                <a href = '/applied'>My Jobs</a>
                              </>}
                         <a href = '/' onClick={handleLogout}>Logout</a>
                        </div> : null}
  
                  </div>
              </div>: 

              <a href='/login' className = {pathName === '/login' ? 'active' : ''}>Login</a>}
              {user.isLoggedIn ? <p id = 'loggedinMessage'>Welcome, {user.values?.email}</p> : null}
        </div>
    )
}