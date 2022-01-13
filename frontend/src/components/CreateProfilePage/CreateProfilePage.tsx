import React,{useState,createRef} from 'react'
import Errors from '../messages/Errors';
import axios from 'axios'

export default function CreateProfilePage() {
    const [currentTab,setCurrentTab] = useState(1)
    const [errors,setErrors] = useState<Array<string>>([])

    const maxTabs = document.querySelectorAll('.show,.hide').length
    
    return (
        <div>
            <div className = 'steps'>
                <span className = {`step ${currentTab === 1 ? 'active' : null}`}><p className = 'step-label'>Details</p></span>
                <span className = {`step ${currentTab === 2 ? 'active' : null}`}><p className = 'step-label'>CV</p></span>
            </div>
            
            <form>
                <div className = {currentTab === 1 ? 'show' : 'hide'}>
                  <h1 className = 'title'>Details</h1> 
                    <Errors errors = {errors}/>
                    <label htmlFor = 'email'><h3>Email address:</h3></label>
                    <input type = 'email'  id = 'email' placeholder = 'E.g 123@example.com' autoComplete = 'on' required/>
                </div>

                <div className = {currentTab === 2 ? 'show' : 'hide'}>
                    <h1 className = 'title'>CV</h1> 
                    <Errors errors = {errors}/>
                </div>
                
                {currentTab === maxTabs ? <button id = 'submit'>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {() => setCurrentTab(currentTab + 1)} style = {{float:'right'}}>Next</button>}
                <button type = 'button' className = 'toggleTabBtn' onClick = {() => setCurrentTab(currentTab - 1)} disabled = {currentTab === 1}>Previous</button>
            </form>

        
        </div>
    )
}
