import React,{useState,createRef} from 'react'
import {useNavigate} from "react-router-dom";
import Errors from '../messages/Errors';
import {FormProps} from './types/RegisterInterface'
import axios from 'axios'

export default function RegisterPage() {
    let navigate = useNavigate()
    const pathName = window.location.pathname

    const emailRef = createRef<HTMLInputElement>()
    const passwordRef = createRef<HTMLInputElement>()
    const confirmPasswordRef = createRef<HTMLInputElement>()

    const [errors,setErrors] = useState<Array<string>>([])
    const [FieldErrors,setFieldErrors] = useState<FormProps>({
        emailIsValid: true,
        password: {hasValidLength: null,
            hasUppercase: null,
            hasDigit: null,
            hasSymbol: null
        },
        confirmPasswordIsValid: true})
 
    const validateForm = (email: string | undefined, password: string | undefined,confirmPassword: string | undefined) => {
        let isValid = true
        let errors = []

        const emailRegex = /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i
    
        const numbers = /[0-9]/g
        const symbols = /[!£$%^&*()]/g
        const upper = /[A-Z]/g

        if (!email?.match(emailRegex)){
            errors.push('Invalid email')
            setFieldErrors(prev => {return {...prev,emailIsValid: false}})
            isValid = false
        }

        if (password != null && password.length < 9){
                setFieldErrors(prev => ({
                    ...prev,
                    password: {...prev.password, hasValidLength: false}
                }))

                isValid = false
        }

        else{
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasValidLength: true}
            }))

        }

        if (!password?.match(numbers)){
               setFieldErrors(prev => ({
                    ...prev,
                    password: {...prev.password, hasDigit: false}
                }))

                isValid = false
        }

        else{
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasDigit: true}
            }))
        }

        if (!password?.match(upper)){
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasUppercase: false}
            }))

            isValid = false
        }

        else{
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasUppercase: true}
            }))
        }

        if (!password?.match(symbols)){
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasSymbol: false}
            }))

            isValid = false
        }
        
        else{
            setFieldErrors(prev => ({
                ...prev,
                password: {...prev.password, hasSymbol: true}
            }))
        }

        if (password !== confirmPassword){
            setFieldErrors(prev => {return {...prev,confirmPasswordIsValid : true}})
            errors.push('Passwords must match')
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
        const confirmPassword = confirmPasswordRef.current?.value
        
        if (!validateForm(email,password,confirmPassword)){
            e.preventDefault()
            return 
        }

        const requestOptions = { 
            headers:{'Content-Type':'application/json'}
        }

        axios.post(`/api/auth/${pathName}`,JSON.stringify({email: email,password: password}),requestOptions)
        .then(response => {
            const data = response.data
            localStorage.setItem('token',data.token)
            navigate('/')
            window.location.reload()
        })

        .catch(error => {
            setErrors(['Email already exists'])
            window.scrollTo(0, 0)
        })
     
    }

    return (
        <div>
            <h1 className = 'title'>Register</h1>
            <Errors errors = {errors}/>

            <form onSubmit = {handleSubmitForm} noValidate>
                <div style = {{textAlign:'center'}}>
                    <b><p style={{fontSize:'20px'}}>Password:</p></b> 
                    <li className = {FieldErrors.password.hasValidLength === false ? 'error' : FieldErrors.password.hasValidLength ? 'success': ''}>Must be atleast 9 characters long</li>
                    <li className = {FieldErrors.password.hasUppercase === false ? 'error' : FieldErrors.password.hasUppercase ? 'success' : ''}>Contains atleast one uppercase character</li>
                    <li className = {FieldErrors.password.hasDigit === false ? 'error' : FieldErrors.password.hasDigit ? 'success' : ''}>Contains atleast one digit</li>
                    <li className = {FieldErrors.password.hasSymbol === false ? 'error' : FieldErrors.password.hasSymbol ? 'success' : ''}>Contains atleast one of these symbols: !,£,$,%,^,&,*,(,)</li>
                    <hr className="mt-0-mb-4" />
                </div>
            
                <label htmlFor = 'email'><h3>Email address:</h3></label>
                <input type = 'email' className = {!FieldErrors.emailIsValid ? 'inputError' : ''} ref = {emailRef} id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required/>

                <label htmlFor = 'password'><h3>Password:</h3></label>
                <input type = 'password' className = {FieldErrors.password.hasValidLength === false || !FieldErrors.password.hasDigit === false || FieldErrors.password.hasSymbol === false || FieldErrors.password.hasUppercase === false ? 'inputError' : ''} ref = {passwordRef} placeholder = 'Password...' id = 'password' autoComplete = 'on' required/>

                <label htmlFor = 'ConfirmPassword'><h3>Confirm password:</h3></label>
                <input type = 'password' className = {!FieldErrors.confirmPasswordIsValid ? 'inputError' : ''} ref = {confirmPasswordRef} id = 'confirmPassword' placeholder = 'Confirm password...' autoComplete = 'on' required/>

                <button id = 'submit'>Submit</button>

            </form>
            
            <div style = {{textAlign:'center'}}>
               <p style = {{marginTop:'70px',fontSize:'18px'}}>Have an account already?</p>
               <a href = '/login' ><button>Login</button></a> 
            </div>
            
        </div>
    )
}
