import React,{useState} from 'react'
import {useAppSelector,useAppDispatch} from '../features/hooks'
import {NavLink} from 'react-router-dom'
import {token,logout} from '../features/Auth/user'
import axios from 'axios'
import './css/Navbar.css'

export default function Navbar() {
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
        
        setDropdown(false)
        dispatch(logout())

    }
    
    return (
        <div className = 'nav' id = 'head-nav'>
            <NavLink to = '/'  id = 'firstcast'>FirstCast</NavLink>
            <NavLink to = '/home'>Home</NavLink>
            <NavLink to = '/about'>About</NavLink>
            <NavLink to = '/contact'>Contact</NavLink>

             {user.isLoggedIn ?
             <div>
                <div className = 'dropdown'> 
                <button id = 'navDropBtn' onClick={() => setDropdown(!dropdown)}>My account</button>
                  {dropdown ?  
                    <div className = 'dropdown-content'>
                            {user.values?.isAnEmployer ? 
                             <>
                                <NavLink to = '/companies' onClick = {() => setDropdown(false)}>My companies</NavLink> 
                                <NavLink to = '/jobs' onClick = {() => setDropdown(false)}>My jobs</NavLink> 
                             </> 
                
                            : <>
                                <NavLink to = {`/profile/${user.values?.id}`} onClick = {() => setDropdown(false)}>My Profile</NavLink>
                                <NavLink to  = '/applied' onClick = {() => setDropdown(false)}>My Jobs</NavLink>
                              </>}
                         <NavLink to = '/' onClick = {handleLogout}>Logout</NavLink>
                        </div> : null}
  
                  </div>
              </div>: 

              <NavLink to = '/login' onClick = {() => setDropdown(false)} >Login</NavLink>}
              {user.isLoggedIn ? <p id = 'loggedinMessage'>Welcome, {user.values?.email}</p> : null}
        </div>
    )
}