import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate, useLocation} from "react-router-dom";
import {useAppDispatch} from '../../../app/hooks';
import {login, setUser} from '../../../features/Auth/user';
import Errors from '../../Global/messages/Errors';
import useAuth from '../../../hooks/useAuth';
import { axiosInstance } from '../../../axios';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

export default function LoginPage() {
    const { setAccessToken, setCSRFToken } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()
    const [email,setEmail] = useState({value: '', isValid: true, errorMsg: 'Email is required'})
    const [password,setPassword] = useState({value: '', isValid: true, errorMsg: 'Password is required'})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState<Array<string>>([])

    const validateForm = () => {
        let isValid = true
        let errors = []

        if (email.value === ''){
            errors.push(email.errorMsg)
            setEmail(prev => {return {...prev,isValid: false}})
            isValid = false
        }

        if (password.value === ''){
            errors.push(password.errorMsg)
            setPassword(prev => {return {...prev,isValid: false}})
            isValid = false
        }

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        return isValid
    }

    async function handleSubmitForm(e: React.SyntheticEvent){
        e.preventDefault()

        if (!validateForm()) return
        
        try{
            const response = await axiosInstance.post('auth/login', JSON.stringify({
                email: email.value,
                password: password.value
            }))

            setAccessToken(response?.data?.access_token)
            setCSRFToken(response.headers["x-csrftoken"])
            dispatch(login())
        } catch (error) {
            setErrors(['Email or password is invalid'])
        }

    }

    return (
        <form className = 'normalForm' onSubmit = {handleSubmitForm} noValidate>
            <h1 className = 'title'>Login</h1>
            <Errors errors = {errors}/>
            <hr className = "mt-0-mb-4" />
            <label htmlFor = 'email'><h3>Email address:</h3></label>
            <input type = 'email' className = {!email.isValid ? 'inputError' : ''} onChange = {e => setEmail(prev => {return {...prev, value: e.target.value}})} id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required />

            <label htmlFor = 'password'><h3>Password:</h3></label>
            <input type = 'password' className = {!password.isValid ? 'inputError' : ''} onChange = {e => setPassword(prev => {return {...prev, value: e.target.value}})} value = {password.value} placeholder = "Password..." id = 'password' autoComplete = 'on' required />

            <button id = 'submit'>Submit</button>
        </form>
    )
}
