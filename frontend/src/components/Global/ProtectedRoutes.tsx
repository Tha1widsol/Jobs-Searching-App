import React from 'react';
import {Outlet,Navigate} from 'react-router'
import { useNavigate } from 'react-router-dom';
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
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
  const navigate = useNavigate()

  if (User().isAnEmployer) return <Navigate to = '/'/>

  const token = localStorage.getItem('token')
  const requestOptions = { 
    headers:{'Content-Type':'application/json', Authorization:`Token ${token}`}
  }

  axios.get('/api/profile',requestOptions)
  .then(response => {
       if (response.status === 200)
          navigate('/')
  })
  
 .catch(error => {
     if (error.response.status !== 404){
      navigate('/')
     }

 })

 return <Outlet/>

}

export const CheckHomePage = () => {
  const user = useAppSelector(state => state.user.values)
  return User().loggedIn && !User().isAnEmployer ? <JobSeekersHomePage/> : User().loggedIn && User().isAnEmployer ? <EmployersHomePage/> : <Outlet/>
}