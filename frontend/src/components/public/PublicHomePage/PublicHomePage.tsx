import React from 'react'
import './css/HomePage.css'

export default function PublicHomePage() {
    return (
        <div style = {{textAlign:'center'}}>
            <h1 id = 'youAre'>You are...</h1>

            <section id = 'containers'>
                <section className = 'container'>
                    <h2 className = 'heading'><u>Looking for a job:</u></h2>
                    <p>Find your dream job right now with one of the most trusted job searching engines on the web.</p>
                    <a href = '/register?choice=jobseeker' ><button id = 'jobseeker' >Add your profile</button></a> 
                </section>
                
                <div id = 'divider'/>

                <section className = 'container'>
                    <h2 className = 'heading'><u>An employer:</u></h2>
                    <p>Setup your company and start adding jobs using our system.</p>
                    <a href = '/register?choice=employer' ><button id = 'company' >Add your company</button></a> 
                </section>
            </section>
          
        </div>
    )
}