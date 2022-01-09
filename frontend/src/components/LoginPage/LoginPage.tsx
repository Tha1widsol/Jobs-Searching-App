import React,{useState,createRef} from 'react'
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import Errors from '../messages/Errors';
import { FormProps } from './types/LoginInterface'

export default function LoginPage() {
    let navigate = useNavigate()
    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<any>()
    const [errors,setErrors] = useState<Array<string>>([])
    const [FieldErrors,setFieldErrors] = useState<FormProps>({emailError: false,passwordError:false})

    const validateForm = (email : string | undefined, password: string | undefined) => {
        let isValid = true
        let errors = []

        if (email === ''){
            errors.push('Email is required')
            setFieldErrors(prev => {return {...prev,emailError : true}})
            isValid = false
        }

        if (password === ''){
            errors.push('Password is required')
            setFieldErrors(prev => {return {...prev,passwordError : true}})
            isValid = false
        }

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        return isValid
    }

    function handleSubmitForm(e:any){
        e.preventDefault()
        const email = emailRef.current?.value
        const password = passwordRef.current?.value 

        if (!validateForm(email,password)){
            e.preventDefault()
            return
        }

        const requestOptions = { 
            headers:{'Content-Type':'application/json'}
        }

        axios.post('/api/auth/login',JSON.stringify({email: email,password: password}),requestOptions)
        .then(response => {
            const data = response.data
            localStorage.setItem('token',data.token)
            navigate('/')
            window.location.reload()

        })

        .catch(error => {
            if (error.response)
                passwordRef.current.value = null
                setFieldErrors(prev => {return {...prev,passwordError : true}})
                setErrors(['Email or password is invalid'])
            
        })

    }

    return (
        <div>
            <h1 className = 'title'>Login</h1>
            <Errors errors = {errors}/>

            <form onSubmit = {handleSubmitForm} noValidate>
                <hr className = "mt-0-mb-4" />
                <label htmlFor = 'email'><h3>Email address:</h3></label>
                <input type = 'email' className = {FieldErrors.emailError ? 'inputError' : ''} ref = {emailRef} id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required />

                <label htmlFor = 'password'><h3>Password:</h3></label>
                <input type = 'password' className = {FieldErrors.passwordError ? 'inputError' : ''} ref = {passwordRef} placeholder = "Password..." id = 'password' autoComplete = 'on' required />

                <button id = 'submit'>Submit</button>
            </form>
        </div>
    )
}
