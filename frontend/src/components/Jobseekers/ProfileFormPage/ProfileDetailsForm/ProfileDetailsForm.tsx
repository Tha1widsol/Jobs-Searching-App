import React,{useState, useEffect} from 'react'
import {useAppSelector, useAppDispatch} from '../../../Global/features/hooks'
import { useNavigate } from 'react-router-dom'
import {fetchProfile} from '../../../Global/features/Jobseekers/profiles/profile'
import Errors from '../../../Global/messages/Errors'
import {handleFixName} from '../../../Global/formFunctions'
import {FileProps} from '../../../Global/types/forms'
import { handleAddSuccessMsg } from '../../../Global/messages/SuccessAlert'
import { token } from '../../../Global/features/Auth/user'
import axios from 'axios'

export default function ProfileDetailsForm({isIsolated = true, toggleTab, popupOff}: {isIsolated?: boolean, toggleTab: () => void, popupOff: () => void}) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.values)
    const [errors,setErrors] = useState<Array<string>>([])
    const profile = useAppSelector(state => state.profile)
    const [firstName,setFirstName] = useState({value: '', isValid: true, errorMsg: 'First name is invalid'})
    const [middleName,setMiddleName] = useState({value: '', isValid: true, errorMsg: 'Middle name is invalid'})
    const [lastName,setLastName] = useState({value: '', isValid: true, errorMsg: 'Last name is invalid'})
    const [phone,setPhone] = useState({value: '', isValid: true, errorMsg: 'Phone number is invalid'})
    const [about,setAbout] = useState({value: '', isValid: true, currentLength: Number(profile?.values?.about?.length), maxLength: 250, errorMsg: 'About section needs to have atleast 100 characters'})
    const [logo,setLogo] = useState<FileProps>({value: '', name:''})

    useEffect(() => {
        setFirstName(prev => {return{...prev, value: profile.values?.firstName}})
        setMiddleName(prev => {return{...prev, value: profile.values?.middleName || ''}})
        setLastName(prev => {return{...prev, value: profile.values?.lastName}})
        setPhone(prev => {return{...prev, value: profile.values?.phone}})
        setAbout(prev => {return{...prev, value: profile.values?.about}})
    },[dispatch,
        profile.values?.about,
        profile.values?.firstName,
        profile.values?.lastName,
        profile.values?.middleName,
        profile.values?.phone,
        user.id
        ])

    const validateForm = () => {
        let isValid = true
        let errors: Array<string> = []
        const letters = /^[A-Za-z]+$/
        const numbers = /[0-9]/g

        if (!firstName.value.match(letters)){
            setFirstName(prev => {return {...prev,isValid: false}})
            errors.push(firstName.errorMsg)
            isValid = false
        }

        else setFirstName(prev => {return {...prev,isValid: true}})

        if (middleName.value !== '' && !middleName.value?.match(letters)){
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

        if (!phone.value.match(numbers) || phone.value.length < 9){
            setPhone(prev => {return {...prev, isValid: false}})
            errors.push(phone.errorMsg)
            isValid = false
        }

        else setPhone(prev => {return {...prev, isValid: true}})

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

        setErrors([])
        return isValid
    }

    function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault()
        if (!validateForm()) return
        let form = new FormData();

        form.append('firstName',firstName.value)
        form.append('middleName',middleName.value)
        form.append('lastName',lastName.value)
        form.append('phone',phone.value)
        form.append('about',about.value)

        
        if (logo.value)
           form.append('logo',logo.value,logo.name)

          axios({
            method: 'post',
            url: '/api/profile',
            data: form,
            headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
          })

          .then(response => {
            if (response.status === 201){
               if (!isIsolated) {
                   toggleTab()
                   return
               }

               handleAddSuccessMsg('Profile is successfully saved', dispatch)
               navigate(`/profile/${user.id}`)
               popupOff()
               dispatch(fetchProfile(user.id))
           }
       })

       .catch(error => {
           if (error.response.status === 400) setErrors(['Something went wrong'])
       })

    }

  return (
    <form>
            <h1 className = 'title'>Details</h1> 
            <Errors errors = {errors}/>

            <label htmlFor = 'firstName'><h3>First name:</h3></label>
            <input id = 'firstName' value = {firstName.value} className = {!firstName.isValid ? 'inputError' : ''} onChange = {e => setFirstName(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'First name...' autoComplete = 'on' required/>

            <label htmlFor = 'middleName'><h3>Middle name (Optional):</h3></label>
            <input id = 'middleName' value = {middleName.value} className = {!middleName.isValid ? 'inputError' : ''} onChange = {e => setMiddleName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Middle name...' onKeyUp = {handleFixName} autoComplete = 'on'/>

            <label htmlFor = 'lastName'><h3>Last name:</h3></label>
            <input id = 'lastName' value = {lastName.value} className = {!lastName.isValid ? 'inputError' : ''}  onChange = {e => setLastName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Last name...' onKeyUp = {handleFixName} autoComplete = 'on' required/>

            <label htmlFor = 'phone'><h3>Phone number: (Only provided to employers)</h3></label>
            <input id = 'phone' value = {phone.value} type = 'tel' className = {!phone.isValid ? 'inputError' : ''} onChange = {e => setPhone(prev => {return {...prev, value: e.target.value}})} placeholder = 'Phone number...' autoComplete = 'on' maxLength = {15} required/>

            <label htmlFor = 'about' ><h3>About (Characters remaining: {about.maxLength - about.currentLength}):</h3></label>
            <textarea id = 'about' value = {about.value} className = {!about.isValid ? 'inputError' : ''} onChange = {e => setAbout(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about yourself...' maxLength = {about.maxLength} style = {{height:'100px'}} required/>

            <label htmlFor = 'logo'><h3>Profile logo (Optional):</h3></label>
            <input id = 'logo' type = 'file' accept = 'image/*' autoComplete = 'on' onChange = {e => {if (!e.target.files) return; setLogo({value: e.target.files[0], name: e.target.files[0].name})}}/>
            {profile.values?.logo ? <p>Current logo: {profile.values.logo}</p> : null} 

            <div style = {{float: 'right', marginTop: '10px'}} onClick = {handleSubmit}>
                 {isIsolated ? <button type = 'submit'>Submit</button> : <button>Next</button>}
            </div>
    </form>
  )
}
