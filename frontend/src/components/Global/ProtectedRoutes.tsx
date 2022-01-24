import React from 'react';
import {Outlet,Navigate} from 'react-router'
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';
import PublicHomePage from '../public/PublicHomePage/PublicHomePage';
import axios from 'axios'

const User = () => {
  const user = useAppSelector(state => state.user.values)
  return user
}


export const CheckNotLoggedIn = () => {
  return User().loggedIn ? <Navigate to = '/'/> : <Outlet/> 
}

export const CheckLoggedIn = () => { 
    return User().loggedIn ? <Outlet/> : <LoginPage/>
}

export const CheckNoProfileExists = () => { 
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  if (User().isAnEmployer) return <Navigate to = '/'/>

  const requestOptions = { 
    headers:{'Content-Type':'application/json', Authorization:`Token ${token}`}
  }

  axios.get('/api/profile',requestOptions)
  .then(response => {
       if (response.status == 200)
          return navigate('/')
  })
  
 .catch(error => {
     if (error.response.status !== 404){
      return navigate('/')
     }

 })

 return <Outlet/>

}
