import React from 'react';
import {Outlet,Navigate} from 'react-router'
import {useAppSelector} from '../../app/hooks';
import LoginPage from '../public/LoginPage/LoginPage';

const User = () => {
  return useAppSelector(state => state.user)
}

export const CheckAccount = ({isJobSeeker = true}: {isJobSeeker?: boolean}) => {
  if (isJobSeeker) return User().values?.isAnEmployer ? <Navigate to = '/'/> : <Outlet/>
  return !User().values?.isAnEmployer ? <Navigate to = '/'/> : <Outlet/>
}

export const CheckLoggedIn = ({checkLoggedIn = true}: {checkLoggedIn?: boolean}) => { 
  if (checkLoggedIn) return User().isLoggedIn ? <Outlet/> : <LoginPage/>
  return User().isLoggedIn ? <Navigate to = '/'/> : <Outlet/> 
}
