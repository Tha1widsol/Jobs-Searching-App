import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import CreateProfilePage from '../Jobseekers/CreateProfilePage/CreateProfilePage'
import {CheckNotLoggedIn,CheckJobSeeker,CheckEmployer} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import CreateCompanyPage from '../Employers/CreateCompanyPage/CreateCompanyPage'
import CompaniesPage from '../Employers/CompaniesPage/CompaniesPage'
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
                       <Route path = '/create-company' element = {<CreateCompanyPage/>}/>
                       <Route path = '/companies' element = {<CompaniesPage/>}/>
                    </Route>
                    
                </Routes>
            </Router>
        </div>
    )
}