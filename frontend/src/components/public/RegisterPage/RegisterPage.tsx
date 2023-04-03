import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from "react-router-dom";
import Errors from '../../Global/messages/Errors';
import {PasswordProps} from './types/RegisterInterface'
import { useAppDispatch } from '../../../app/hooks'; 
import {login} from '../../../features/Auth/user';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

export default function RegisterPage() {
    let query = useQuery()
    const choice = query.get('choice')
   const {signup} = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [errors,setErrors] = useState<Array<string>>([])
    const [email,setEmail] = useState({value: '',isValid: true, invalidErrorMsg: 'Invalid email', alreadyExistsErrorMsg: 'Email already exists'})
    const [password,setPassword] = useState<PasswordProps>({value: '', hasValidLength: null, hasUppercase: null, hasDigit: null, hasSymbol: null})
    const [confirmPassword,setConfirmPassword] = useState({value: '', isValid: true, errorMsg: 'Passwords must match'})

    useEffect(() => {
       if (choice !== 'jobseeker' && choice !== 'employer') navigate('/')
    },[choice,navigate])

    const validateForm = () => {
        let isValid = true
        let errors = []
        const emailRegex = /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i
        const numbers = /[0-9]/g
        const symbols = /[!£$%^&*()]/g
        const upper = /[A-Z]/g

        if (!email.value.match(emailRegex)){
            errors.push(email.invalidErrorMsg)
            setEmail(prev => {return {...prev,isValid: false}})
            isValid = false
        }

        else setEmail(prev => {return {...prev,isValid: true}})

        if (password.value != null && password.value.length < 9){
            setPassword(prev => {return {...prev,hasValidLength: false}})
            isValid = false
        }

        else setPassword(prev => {return {...prev,hasValidLength: true}})
            
        
        if (!password.value.match(numbers)){
            setPassword(prev => {return {...prev,hasDigit: false}})
            isValid = false
        }

        else setPassword(prev => {return {...prev,hasDigit: true}})
           

        if (!password.value.match(upper)){
            setPassword(prev => {return {...prev,hasUppercase: false}})
            isValid = false
        }

        else setPassword(prev => {return {...prev,hasUppercase: true}})
          
        if (!password.value.match(symbols)){
            setPassword(prev => {return {...prev,hasSymbol: false}})
            isValid = false
        }
        
        else setPassword(prev => {return {...prev,hasSymbol: true}})
            

        if (password.value !== confirmPassword.value){
            setConfirmPassword(prev => {return {...prev,isValid: false}})
            errors.push(confirmPassword.errorMsg)
            isValid = false
        }

        else setConfirmPassword(prev => {return {...prev,isValid: true}})
           
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

        axios.post(`/api/auth/register/${choice}`,JSON.stringify({email: email.value,password: password.value}),requestOptions)
        .then(response => {
            const data = response.data
            localStorage.setItem('token',data.token)
            signup(email.value, password.value)
            dispatch(login())
            choice === 'jobseeker' ? navigate('/create-profile') : navigate('/create-company')
            window.location.reload()
        })

        .catch(error => {
            console.log(error)
            setErrors([email.alreadyExistsErrorMsg])
            window.scrollTo(0, 0)
        })
     
    }

    return (
        <form className = 'normalForm' onSubmit = {handleSubmitForm} noValidate>
            <h1 className = 'title'>Register</h1>
            <Errors errors = {errors}/>

            <div style = {{textAlign:'center'}}>
                <b><p style={{fontSize:'20px'}}>Password:</p></b> 
                <li className = {password.hasValidLength === false ? 'error' : password.hasValidLength ? 'valid': ''}>Must be atleast 9 characters long</li>
                <li className = {password.hasUppercase === false ? 'error' : password.hasUppercase ? 'valid' : ''}>Contains atleast one uppercase character</li>
                <li className = {password.hasDigit === false ? 'error' : password.hasDigit ? 'valid' : ''}>Contains atleast one digit</li>
                <li className = {password.hasSymbol === false ? 'error' : password.hasSymbol ? 'valid' : ''}>Contains atleast one of these symbols: !,£,$,%,^,&,*,(,)</li>
                <hr className = 'mt-0-mb-4' />
            </div>
        
            <label htmlFor = 'email'><h3>Email address:</h3></label>
            <input type = 'email' className = {!email.isValid ? 'inputError' : ''} onChange = {e => setEmail(prev => {return {...prev, value: e.target.value}})} id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required/>

            <label htmlFor = 'password'><h3>Password:</h3></label>
            <input type = 'password' className = {password.hasValidLength === false || password.hasDigit === false || password.hasSymbol === false || password.hasUppercase === false ? 'inputError' : ''} onChange = {e => setPassword(prev => {return {...prev, value: e.target.value}})} placeholder = 'Password...' id = 'password' autoComplete = 'on' required/>

            <label htmlFor = 'ConfirmPassword'><h3>Confirm password:</h3></label>
            <input type = 'password' className = {!confirmPassword.isValid? 'inputError' : ''} onChange = {e => setConfirmPassword(prev => {return {...prev, value: e.target.value}})} id = 'confirmPassword' placeholder = 'Confirm password...' autoComplete = 'on' required/>

            <button type = 'submit' id = 'submit'>Submit</button>

            <div style = {{textAlign:'center'}}>
               <p style = {{marginTop:'70px',fontSize:'18px'}}>Have an account already?</p>
               <a href = '/login' ><button type = 'button'>Login</button></a> 
            </div>
            
        </form>
    )
}
