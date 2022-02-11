import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import {FieldProps} from '../../Global/types/forms'
import {handleFixName} from '../../Global/formFunctions';
import {TextFieldProps} from '../../Jobseekers/CreateProfilePage/types/CreateProfileInterface';
import Errors from '../../Global/messages/Errors'
import axios from 'axios'

export default function CreateEmployerPage() {
    let navigate = useNavigate()
    const [firstName,setFirstName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'First name is invalid'})
    const [middleName,setMiddleName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'Middle name is invalid'})
    const [lastName,setLastName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'Last name is invalid'})
    const [errors,setErrors] = useState<Array<string>>([])
    const [about,setAbout] = useState<TextFieldProps>({value: '', isValid: true, currentLength: 0, maxLength: 250, errorMsg: 'About section needs to have atleast 100 characters'})
    const [logo,setLogo] = useState<{value: string | Blob, name:string}>({value: '',name:''})

    const validateForm = () => {
        let isValid = true
        let errors = []
        const letters = /^[A-Za-z]+$/

        if (!firstName.value.match(letters)){
            setFirstName(prev => {return {...prev,isValid: false}})
            errors.push(firstName.errorMsg)
            isValid = false
        }

        else setFirstName(prev => {return {...prev,isValid: true}})

        
        if (middleName.value !== '' && !middleName.value.match(letters)){
            setMiddleName(prev => {return {...prev,isValid: false}})
            errors.push(middleName.errorMsg)
            isValid = false
        }

        else setMiddleName(prev => {return {...prev,isValid: true}})

        if (!lastName.value.match(letters)){
            setLastName(prev => {return {...prev,isValid: false}})
            errors.push(lastName.errorMsg)
            isValid = false
        }

        else setLastName(prev => {return {...prev,isValid: true}})


        if (about.value.length < 100){
            setAbout(prev => {return {...prev,isValid: false}})
            errors.push(about.errorMsg)
            isValid = false
        }

        else setAbout(prev => {return {...prev,isValid: true}})

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        return isValid
    }

    function handleSubmitForm(e:any){
        e.preventDefault()
        const token = localStorage.getItem('token')

        if (!validateForm()) return

        const requestOptions = {
            headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

        let form = new FormData()

        form.append('firstName',firstName.value)
        form.append('middleName',middleName.value)
        form.append('lastName',lastName.value)
        form.append('about',about.value)

        if (logo.value !== '') form.append('logo',logo.value,logo.name)

        axios.post('/api/employer',form,requestOptions)
        .then(response => {
            if (response.status === 201) navigate('/create-company')
        })

        .catch(error => {
            if (error.response.status === 400) setErrors(['Something went wrong'])
        })
    
    }

  return (
    <div>
        <h1 className = 'title'>Create Employer</h1>
        <Errors errors = {errors}/>

        <form onSubmit = {handleSubmitForm} noValidate> 
            <label htmlFor = 'firstName'><h3>First name:</h3></label>
            <input id = 'firstName' className = {!firstName.isValid ? 'inputError' : ''} onChange = {e => setFirstName(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'First name...' autoComplete = 'on' required/>

            <label htmlFor = 'middleName'><h3>Middle name (Optional):</h3></label>
            <input id = 'middleName' className = {!middleName.isValid ? 'inputError' : ''} onChange = {e => setMiddleName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Middle name...' onKeyUp = {handleFixName} autoComplete = 'on'/>

            <label htmlFor = 'lastName'><h3>Last name:</h3></label>
            <input id = 'lastName' className = {!lastName.isValid ? 'inputError' : ''}  onChange = {e => setLastName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Last name...' onKeyUp = {handleFixName} autoComplete = 'on' required/>

            <label htmlFor = 'about' ><h3>About (Characters remaining: {about.maxLength - about.currentLength}):</h3></label>
            <textarea id = 'about' className = {!about.isValid ? 'inputError' : ''} onChange = {e => setAbout(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about yourself...' maxLength = {about.maxLength} style = {{height:'100px'}} required/>

            <label htmlFor = 'logo'><h3>Profile logo (Optional):</h3></label>
            <input id = 'logo' type = 'file' accept = 'image/*' autoComplete = 'on' onChange = {(e:any) => setLogo({value: e.target.files[0], name: e.target.files[0].name})}/>

            <button type = 'submit' id = 'submit'>Submit</button>
        </form>
       

    </div>
  )
}
