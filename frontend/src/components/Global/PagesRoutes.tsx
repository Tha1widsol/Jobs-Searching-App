import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import CreateProfilePage from '../Jobseekers/CreateProfilePage/CreateProfilePage'
import {CheckNotLoggedIn,CheckNoProfileExists} from './ProtectedRoutes'

export default function PagesRoutes() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {<PublicHomePage/>}/>
                    <Route path = '/home' element = {<PublicHomePage/>}/>
                
                    <Route element = {<CheckNotLoggedIn/>}>
                        <Route path = '/register/jobseeker' element = {<RegisterPage/>}/>
                        <Route path = '/register/employer' element = {<RegisterPage/>}/>
                        <Route path = '/login' element = {<LoginPage/>}/>
                    </Route>

                    <Route element = {<CheckNoProfileExists/>}>
                       <Route path = '/create-profile' element = {<CreateProfilePage/>}/>
                    </Route>
                    
                </Routes>
            </Router>
        </div>
    )
}