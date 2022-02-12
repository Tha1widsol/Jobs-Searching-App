import React from 'react';
import {Outlet,Navigate} from 'react-router'
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';

const isAnEmployer = localStorage.getItem('isAnEmployer')

const User = () => {
  return useAppSelector(state => state.user)
}

export const CheckNotLoggedIn = () => {
  return User().isLoggedIn ? <Navigate to = '/'/> : <Outlet/> 
}

export const CheckJobSeeker = () => {
  if (!User().isLoggedIn) return <Navigate to = '/login'/>
  if (User().values.isAnEmployer) return <Navigate to = '/'/>

  return <Outlet/>
}

export const CheckEmployer = () => {
  if (!User().isLoggedIn) return <Navigate to = '/login'/>
  if (!User().values.isAnEmployer) return <Navigate to = '/'/>

  return <Outlet/>
}

export const CheckLoggedIn = () => { 
    return User().isLoggedIn ? <Outlet/> : <LoginPage/>
}
