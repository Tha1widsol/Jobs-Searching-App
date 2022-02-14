import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import CreateProfilePage from '../Jobseekers/CreateProfilePage/CreateProfilePage'
import {CheckNotLoggedIn,CheckJobSeeker,CheckEmployer} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import CreateEmployerPage from '../Employers/CreateEmployerPage/CreateEmployerPage'
import EmployerPage from '../Employers/EmployerPage/EmployerPage'
import {useAppSelector} from './features/hooks'
import ProfilePage from '../Jobseekers/ProfilePage/ProfilePage'

export default function PagesRoutes() {
    const isAnEmployer = localStorage.getItem('isAnEmployer')
    const user = useAppSelector(state => state.user)

    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {isAnEmployer === 'true' && user.isLoggedIn ? <EmployersHomePage/> : isAnEmployer === 'false' && user.isLoggedIn ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                    <Route path = '/home' element = {isAnEmployer === 'true' && user.isLoggedIn ? <EmployersHomePage/> : isAnEmployer === 'false' && user.isLoggedIn ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                
                    <Route element = {<CheckNotLoggedIn/>}>
                        <Route path = '/register/jobseeker' element = {<RegisterPage/>}/>
                        <Route path = '/register/employer' element = {<RegisterPage/>}/>
                        <Route path = '/login' element = {<LoginPage/>}/>
                    </Route>

                    <Route element = {<CheckJobSeeker/>}>
                        <Route path = '/create-profile' element = {<CreateProfilePage/>}/>
                        <Route path = '/profile' element = {<ProfilePage/>}/>
                    </Route>
                    
                    <Route element = {<CheckEmployer/>}>
                       <Route path = '/create-employer' element = {<CreateEmployerPage/>}/>
                       <Route path = '/employer' element = {<EmployerPage/>}/>
                    </Route>
                    
                </Routes>
            </Router>
        </div>
    )
}