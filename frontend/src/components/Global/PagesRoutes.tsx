import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import CreateProfilePage from '../Jobseekers/CreateProfilePage/CreateProfilePage'
import {CheckNotLoggedIn,CheckNoProfileExists} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import {useAppSelector} from './features/hooks'

export default function PagesRoutes() {
    const isAnEmployer = localStorage.getItem('isAnEmployer')
    const user = useAppSelector(state => state.user)

    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {isAnEmployer === 'true' && user.loggedIn ? <EmployersHomePage/> : isAnEmployer === 'false' && user.loggedIn ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                    <Route path = '/home' element = {isAnEmployer === 'true' && user.loggedIn ? <EmployersHomePage/> : isAnEmployer === 'false' && user.loggedIn ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                
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