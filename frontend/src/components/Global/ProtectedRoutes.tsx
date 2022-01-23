import React from 'react';
import {Navigate, Outlet} from 'react-router'
import {useAppSelector} from './features/hooks';
import LoginPage from '../public/LoginPage/LoginPage';

const IsAuth = () => {
    const user = useAppSelector(state => state.user.values)
    return user.loggedIn
}

export const CheckNotLoggedIn = () => {
  return IsAuth() ? <Navigate to = '/'/> : <Outlet/> 
}

export const CheckLoggedIn = () => { 
    return IsAuth() ? <Outlet/> : <LoginPage/>
}