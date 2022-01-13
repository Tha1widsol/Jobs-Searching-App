import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import HomePage from '../HomePage/HomePage'
import RegisterPage from '../RegisterPage/RegisterPage'
import LoginPage from '../LoginPage/LoginPage'
import CreateProfilePage from '../CreateProfilePage/CreateProfilePage'

export default function PagesRoutes() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {<HomePage/>}/>
                    <Route path = '/home' element = {<HomePage/>}/>
                    <Route path = '/register/job_seeker' element = {<RegisterPage/>}/>
                    <Route path = '/register/employer' element = {<RegisterPage/>}/>
                    <Route path = '/login' element = {<LoginPage/>}/>
                    <Route path = '/create-profile' element = {<CreateProfilePage/>}/>
                </Routes>
            </Router>
        </div>
    )
}