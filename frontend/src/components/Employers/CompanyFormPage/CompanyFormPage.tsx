import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import Errors from '../../Global/messages/Errors'
import {useAppDispatch} from '../../Global/features/hooks';
import {FieldProps} from '../../Global/types/forms';
import {TextFieldProps} from '../../Global/types/forms';
import {FileProps} from '../../Global/types/forms';
import axios from 'axios'
import { setMessage } from '../../Global/features/successMsg';

export default function CreateCompanyPage() {
    let navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [errors,setErrors] = useState<Array<string>>([])
    const [name,setName] = useState<FieldProps>({value: '',isValid: true, errorMsg: 'Name is invalid'})
    const [email,setEmail] = useState<FieldProps>({value: '',isValid: true, errorMsg: 'Email is invalid'})
    const [about,setAbout] = useState<TextFieldProps>({value:'', isValid: true,currentLength: 0, maxLength: 250, errorMsg: 'About section needs to have atleast 100 characters'})
    const [phone,setPhone] = useState<FieldProps>({value: '',isValid: true, errorMsg: 'Phone number is invalid'})
    const [industry,setIndustry] = useState({value: 'Any'})
    const [logo,setLogo] = useState<FileProps>({value: '',name:''})
    const [banner,setBanner] = useState<FileProps>({value: '',name:''})
    const [website,setWebsite] = useState<FieldProps>({value: '',isValid: true, errorMsg: 'Website URL is invalid'})

    const validateForm = () => {
        let isValid = true
        let errors: Array<string> = []
        const nameRegex = /^[a-zA-Z\s]*$/
        const numbers = /[0-9]/g
        const emailRegex = /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i
        const urlregex = /((([A-Za-z]{3,9}:(?:)?)(?:[;:&=,\w]+@)?[A-Za-z0-9]+|(?:www|[;:&=,\w]+@)[A-Za-z0-9]+)((?:[~%\w_]*)?\??(?:[=&;%@\w_]*)#?(?:[\\\w]*))?)/
        
        if (!name.value.match(nameRegex)){
            setName(prev => {return {...prev,isValid: false}})
            errors.push(name.errorMsg)
            isValid = false
        }

        else setName(prev => {return {...prev,isValid: true}})

        if (!email.value.match(emailRegex)){
            errors.push(email.errorMsg)
            setEmail(prev => {return {...prev,isValid: false}})
            isValid = false
        }

        else setEmail(prev => {return {...prev,isValid: true}})

        if (about.value.length < 100){
            setAbout(prev => {return {...prev,isValid: false}})
            errors.push(about.errorMsg)
            isValid = false
        }

        else setAbout(prev => {return {...prev,isValid: true}})

        if (!phone.value.match(numbers) || phone.value.length < 9){
            setPhone(prev => {return {...prev, isValid: false}})
            errors.push(phone.errorMsg)
            isValid = false
        }

        else setPhone(prev => {return {...prev, isValid: true}})

        if (!website.value.match(urlregex) && website.value !== ''){
            setWebsite(prev => {return {...prev,isValid: false}})
            errors.push(website.errorMsg)
            isValid = false
        }

        else setWebsite(prev => {return {...prev,isValid: true}})

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        return isValid
            
    }

    function handleSubmitForm(e: React.SyntheticEvent){
        e.preventDefault()
        const token = localStorage.getItem('token')

        if (!validateForm()) return

        const requestOptions = {
            headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

        let form = new FormData();

        form.append('name',name.value)
        form.append('email',email.value)
        form.append('about',about.value)
        form.append('phone',phone.value)
        form.append('industry',industry.value)
        form.append('website',website.value)

        if (logo.value !== '') form.append('logo',logo.value,logo.name)
        if (banner.value !== '') form.append('banner',banner.value,banner.name)

        axios.post('/api/company',form,requestOptions)
        .then(response => {
            if (response.status === 201){
                dispatch(setMessage('Company is successfully added'))
                setTimeout(() => {
                    dispatch(setMessage(''))
                },2000)
                navigate('/companies')
            }
        })

        .catch(error => {
            if (error.response.status === 400) setErrors(['Something went wrong'])
        })

        
    }

  return (
    <div>
        <h1 className = 'title'>Create Company</h1>
        <form onSubmit = {handleSubmitForm} noValidate>  
            <Errors errors = {errors}/>
            <hr className = 'mt-0-mb-4'/>
            <label htmlFor = 'companyName'><h3>Company Name:</h3></label>
            <input id = 'companyName' className = {!name.isValid ? 'inputError' : ''} onChange = {e => setName(prev => {return {...prev, value: e.target.value}})} onKeyUp = {e => e.currentTarget.value = e.currentTarget.value.charAt(0).toUpperCase() + e.currentTarget.value.slice(1)} placeholder = 'Company name...' autoComplete = 'on'/>

            <label htmlFor = 'companyAbout' ><h3>About (Characters remaining: {about.maxLength - about.currentLength}):</h3></label>
            <textarea id = 'companyAbout' className = {!about.isValid ? 'inputError' : ''} onChange = {e => setAbout(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about your company...' maxLength = {about.maxLength} style = {{height:'100px'}}/>

            <label htmlFor = 'companyEmail'><h3>Company Email address:</h3></label>
            <input type = 'email' id = 'companyEmail' className = {!email.isValid ? 'inputError' : ''} onChange = {e => setEmail(prev => {return {...prev, value: e.target.value}})} placeholder = 'E.g 123@example.com' autoComplete = 'on'/>

            <label htmlFor = 'companyPhone'><h3>Company phone number:</h3></label>
            <input id = 'companyPhone' type = 'tel' className = {!phone.isValid ? 'inputError' : ''} onChange = {e => setPhone(prev => {return {...prev, value: e.target.value}})} placeholder = 'Phone number...' autoComplete = 'on' maxLength = {15}/>

            <label htmlFor = 'companyIndustry'><h3>Industry: (What job industry is your company associated with?)</h3></label>
            <select id = 'companyIndustry' onChange = {e => setIndustry({value: e.target.value})} autoComplete = 'on'>
                <option value = 'Any'>Any</option>
                <option value = 'Beauty'>Beauty</option>
                <option value = 'Construction'>Construction</option>
                <option value = 'Information Technology'>Information Technology</option>
            </select>

            <label htmlFor = 'companyLogo'><h3>Logo (Optional):</h3></label>
            <input id = 'companyLogo' type = 'file' accept = 'image/*' autoComplete = 'on' onChange = {e  => {if (!e.target.files) return; setLogo({value: e.target.files[0], name: e.target.files[0].name})}}/>

            <label htmlFor = 'companyBanner'><h3>Banner (Optional):</h3></label>
            <input id = 'companyBanner' type = 'file' accept = 'image/*' autoComplete = 'on' onChange = {e => {if (!e.target.files) return; setBanner({value: e.target.files[0], name: e.target.files[0].name})}}/>

            <label htmlFor = 'companyWebsite'><h3>Website (Optional):</h3></label>
            <input id = 'companyWebsite' className = {!website.isValid ? 'inputError' : ''} type = 'url' onChange = {e => setWebsite(prev => {return {...prev, value: e.target.value}})} placeholder = 'Website link...' autoComplete = 'on'/>

            <button type = 'submit' id = 'submit'>Submit</button>
        </form>
       
    </div>
  )
}
