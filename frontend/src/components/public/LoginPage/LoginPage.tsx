import React,{useState} from 'react'
import axios from 'axios'
import {useAppDispatch} from '../../Global/features/hooks';
import {login} from '../../Global/features/Auth/user';
import Errors from '../../Global/messages/Errors';

export default function LoginPage() {
    const [email,setEmail] = useState({value: '', isValid: true, errorMsg: 'Email is required'})
    const [password,setPassword] = useState({value: '', isValid: true, errorMsg: 'Password is required'})
    const dispatch = useAppDispatch()
    const [errors,setErrors] = useState<Array<string>>([])

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

    function handleSubmitForm(e: React.SyntheticEvent){
        e.preventDefault()

        if (!validateForm()) return

        const requestOptions = { 
            headers:{'Content-Type':'application/json'}
        }

        axios.post('/api/auth/login',JSON.stringify({email: email.value, password: password.value}),requestOptions)
        .then(response => {
                const data = response.data
                localStorage.setItem('token',data.token)
                dispatch(login())
                window.location.reload()
        })

        .catch(error => {
            if (error.response.status === 400) {
                setPassword(prev => {return {...prev,isValid: true}})
                setErrors(['Email or password is invalid'])
                console.clear()
            }
        })

    }

    return (
        <div>
            <h1 className = 'title'>Login</h1>
            <Errors errors = {errors}/>

            <form  onSubmit = {handleSubmitForm} noValidate>
                <hr className = "mt-0-mb-4" />
                <label htmlFor = 'email'><h3>Email address:</h3></label>
                <input type = 'email' className = {!email.isValid ? 'inputError' : ''} onChange = {e => setEmail(prev => {return {...prev, value: e.target.value}})} id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required />

                <label htmlFor = 'password'><h3>Password:</h3></label>
                <input type = 'password' className = {!password.isValid ? 'inputError' : ''} onChange = {e => setPassword(prev => {return {...prev, value: e.target.value}})} value = {password.value} placeholder = "Password..." id = 'password' autoComplete = 'on' required />

                <button id = 'submit'>Submit</button>
            </form>
        </div>
    )
}
