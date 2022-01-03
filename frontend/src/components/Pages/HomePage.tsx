import React from 'react'

export default function HomePage() {
    return (
        <div>
            <h1 id = 'you_are'>You are...</h1>

            <div id = 'home'>
                <div className = 'home-container'>
                    <h2 className = "home-heading"><u>Looking for a job:</u> </h2>
                    <p>Find your dream job right now with one of the most trusted job searching engines on the web.</p>
                    <a href = '/registration/job_seeker' ><button id = 'job_seeker' >Add your profile</button></a> 
                </div>
                
                <div className = 'vertical'></div>

                <div className = 'home-container'>
                    <h2 className = 'home-heading'><u>An employer:</u> </h2>
                    <p>Setup your company and start adding jobs using our system.</p>
                    <a href = '/registration/employer' ><button id = 'company' >Add your company</button></a> 
                </div>
            </div>
          
        </div>
    )
}