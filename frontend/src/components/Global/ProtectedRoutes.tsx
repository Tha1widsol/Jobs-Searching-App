import React from 'react';
import {Navigate, Outlet} from 'react-router'
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';

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
