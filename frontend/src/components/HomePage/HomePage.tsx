import React,{useEffect} from 'react'
import './css/HomePage.css'
import { useAppSelector,useAppDispatch } from '../Global/features/hooks'
import {login} from '../Global/features/user'

export default function HomePage() {
    const user = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(
            login({
                id: 1,
                email: 'laikelvin9@gmail.com',
                hired:true,
                is_an_employer:false
            })
          )
    },[])
  
    return (
        <div>
            <h1 id = 'you_are'>You are...</h1>

            <div id = 'home'>
                <div className = 'home-container'>
                    <h2 className = "home-heading"><u>Looking for a job:</u> </h2>
                    <p>Find your dream job right now with one of the most trusted job searching engines on the web.</p>
                    <a href = '/register/job_seeker' ><button id = 'job_seeker' >Add your profile</button></a> 
                </div>
                
                <div className = 'vertical'></div>

                <div className = 'home-container'>
                    <h2 className = 'home-heading'><u>An employer:</u> </h2>
                    <p>Setup your company and start adding jobs using our system.</p>
                    <a href = '/register/employer' ><button id = 'company' >Add your company</button></a> 
                </div>
            </div>
          
        </div>
    )
}