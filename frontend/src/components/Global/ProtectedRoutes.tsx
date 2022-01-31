import React from 'react';
import {Outlet,Navigate} from 'react-router'
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';
import axios from 'axios'

const isAnEmployer = localStorage.getItem('isAnEmployer')

const User = () => {
  return useAppSelector(state => state.user)
}

export const CheckNotLoggedIn = () => {
  return User().isLoggedIn ? <Navigate to = '/'/> : <Outlet/> 
}

export const CheckLoggedIn = () => { 
    return User().isLoggedIn ? <Outlet/> : <LoginPage/>
}

const GetProfile = () => {
  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const requestOptions = { 
    headers:{'Content-Type':'application/json', Authorization:`Token ${token}`}
  }

  axios.get('/api/profile',requestOptions)
  .then(response => {
       if (response.status === 200){
         navigate('/')
       }
  })
  
 .catch(error => {
     if (error.response.status !== 404){
      navigate('/')
     }

 })

}

export const CheckNoProfileExists = () => { 
  GetProfile()
  if (isAnEmployer === 'true') return <Navigate to = '/'/>
  
  return <Outlet/>
}

