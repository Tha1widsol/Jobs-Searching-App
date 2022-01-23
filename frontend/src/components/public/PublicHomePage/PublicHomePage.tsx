import React from 'react'
import './css/HomePage.css'

export default function PublicHomePage() {
    return (
        <div style = {{textAlign:'center'}}>
            <h1 id = 'you_are'>You are...</h1>

            <div id = 'containers'>
                <div className = 'container'>
                    <h2 className = 'heading'><u>Looking for a job:</u></h2>
                    <p>Find your dream job right now with one of the most trusted job searching engines on the web.</p>
                    <a href = '/register/job_seeker' ><button id = 'jobseeker' >Add your profile</button></a> 
                </div>
                
                <div id = 'vertical'/>

                <div className = 'container'>
                    <h2 className = 'heading'><u>An employer:</u></h2>
                    <p>Setup your company and start adding jobs using our system.</p>
                    <a href = '/register/employer' ><button id = 'company' >Add your company</button></a> 
                </div>
            </div>
          
        </div>
    )
}