import React from 'react'
import {Link} from 'react-router-dom'
import './css/HomePage.css'

export default function PublicHomePage() {
    return (
        <div style = {{textAlign:'center'}}>
            <h1 id = 'youAre'>You are...</h1>

            <section id = 'containers'>
                <section className = 'container'>
                    <h2 className = 'heading'><u>Looking for a job:</u></h2>
                    <p>Find your dream job right now with one of the most trusted job searching engines on the web.</p>
                    <Link to = '/register?choice=jobseeker' ><button id = 'jobseeker' >Add your profile</button></Link> 
                </section>
                
                <div id = 'divider'/>

                <section className = 'container'>
                    <h2 className = 'heading'><u>An employer:</u></h2>
                    <p>Setup your company and start adding jobs using our system.</p>
                    <Link to = '/register?choice=employer' ><button id = 'company' >Add your company</button></Link> 
                </section>
            </section>
          
        </div>
    )
}