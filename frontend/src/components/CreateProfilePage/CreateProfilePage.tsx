import React,{useState,createRef} from 'react'
import Errors from '../messages/Errors';
import axios from 'axios'
import {FormProps} from './types/CreateProfileInterface';

export default function CreateProfilePage() {
    const [currentTab,setCurrentTab] = useState(1)
    const [errors,setErrors] = useState<Array<string>>([])
    const firstNameRef = createRef<HTMLInputElement>()
    const middleNameRef = createRef<HTMLInputElement>()
    const lastNameRef = createRef<HTMLInputElement>()
    const logoRef = createRef<HTMLInputElement>()

    const [FieldErrors,setFieldErrors] = useState<FormProps>({
        firstName: {isValid: true, msg: 'First name is invalid'},
        middleName: {isValid: true, msg: 'Middle name is invalid'},
        lastName:  {isValid: true, msg: 'Last name is invalid'}
    })

    const maxTabs = document.querySelectorAll('.tab').length

    const validateForm = () => {
        let isValid = true
        let errorsArr : Array<string> = []
        const letters = (/^[A-Za-z]+$/);
        const numbers = /[0-9]/g
        const symbols = /[!£$%^&*()]/g
        const firstName = firstNameRef.current?.value
        const middleName = middleNameRef.current?.value
        const lastName = lastNameRef.current?.value

        if (!firstName?.match(letters)){
            setFieldErrors(prev => ({...prev, firstName: {...prev.firstName, isValid: false}}))
            errorsArr.push(FieldErrors.firstName.msg)
            isValid = false
        }

        else setFieldErrors(prev => ({...prev, firstName: {...prev.firstName, isValid: true}}))

        if (middleName !== '' && !middleName?.match(letters)){
            setFieldErrors(prev => ({...prev, middleName: {...prev.middleName, isValid: false}}))
            errorsArr.push(FieldErrors.middleName.msg)
            isValid = false
        }

        else setFieldErrors(prev => ({...prev, middleName: {...prev.middleName, isValid: true}}))

        if (!lastName?.match(letters)){
            setFieldErrors(prev => ({...prev, lastName: {...prev.lastName, isValid: false}}))
            errorsArr.push(FieldErrors.lastName.msg)
            isValid = false
        }

        else setFieldErrors(prev => ({...prev, lastName: {...prev.lastName, isValid: true}}))

        if (!isValid){
            setErrors(errorsArr)
            window.scrollTo(0, 0)
            return
        }

        setErrors([])
        setCurrentTab(currentTab + 1)
    }

    function fixName(e:any){
        const spaceRegex = /\s/g  
        e.target.value = e.target.value.charAt(0).toUpperCase() +  e.target.value.slice(1);  
        e.target.value = e.target.value.replace(spaceRegex, '');
        e.target.value = e.target.value.charAt(0) + e.target.value.slice(1).toLowerCase()
    }

    return (
        <div>
            <div className = 'steps'>
                <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>Personal Details</p></span>
                <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Skills</p></span>
                <span className = {`step ${currentTab === 3 ? 'active' : currentTab > 3 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(3) : null}><p className = 'step-label'>Work Experience</p></span>
                <span className = {`step ${currentTab === 4 ? 'active' : currentTab > 4 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(4) : null}><p className = 'step-label'>Education</p></span>
                <span className = {`step ${currentTab === 5 ? 'active' : currentTab > 5 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(5) : null}><p className = 'step-label'>Preferences</p></span>
            </div>
            
            <form>
                <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
                  <h1 className = 'title'>Details</h1> 
                    <Errors errors = {errors}/>

                    <label htmlFor = 'firstName'><h3>First name:</h3></label>
                    <input id = 'firstName' className = {!FieldErrors.firstName.isValid ? 'inputError' : ''} onKeyUp = {fixName} ref = {firstNameRef} placeholder = 'First name...' autoComplete = 'on' required/>

                    <label htmlFor = 'middleName'><h3>Middle name (Optional):</h3></label>
                    <input id = 'middleName' className = {!FieldErrors.middleName.isValid ? 'inputError' : ''} ref = {middleNameRef} placeholder = 'Middle name...' onKeyUp = {fixName} autoComplete = 'on'/>

                    <label htmlFor = 'lastName'><h3>Last name:</h3></label>
                    <input id = 'lastName' className = {!FieldErrors.lastName.isValid ? 'inputError' : ''} ref = {lastNameRef} placeholder = 'Last name...' onKeyUp = {fixName} autoComplete = 'on' required/>

                    <label htmlFor = 'logo'><h3>Profile logo (Optional):</h3></label>
                    <input id = 'logo' ref = {logoRef} type = 'file' accept = 'image/*' autoComplete = 'on' required/>

                </div>

                <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Skills</h1> 
                    <Errors errors = {errors}/>
                </div>

                <div className = {`tab ${currentTab === 3 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Experience</h1> 
                    <Errors errors = {errors}/>
                </div>

                <div className = {`tab ${currentTab === 4 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Education</h1> 
                    <Errors errors = {errors}/>
                </div>

                <div className = {`tab ${currentTab === 5 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Preferences</h1> 
                    <Errors errors = {errors}/>
                </div>
                
                {currentTab === maxTabs ? <button id = 'submit'>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {validateForm} style = {{float:'right'}}>Next</button>}
                <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {() => setCurrentTab(currentTab - 1)}>Previous</button>
            </form>

        </div>
    )
}
