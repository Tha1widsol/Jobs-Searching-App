import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import CreateProfilePage from '../Jobseekers/CreateProfilePage/CreateProfilePage'
import {CheckLoggedIn,CheckAccount} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import CreateCompanyPage from '../Employers/CreateCompanyPage/CreateCompanyPage'
import CompaniesPage from '../Employers/CompaniesPage/CompaniesPage'
import {useAppSelector} from './features/hooks'
import ProfilePage from '../Jobseekers/ProfilePage/ProfilePage'
import CompanyPage from '../Employers/CompanyPage/CompanyPage'

export default function PagesRoutes() {
    const user = useAppSelector(state => state.user)
    

    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                    <Route path = '/home' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                
                    <Route element = {<CheckLoggedIn checkLoggedIn = {false}/>}>
                        <Route path = '/register/jobseeker' element = {<RegisterPage/>}/>
                        <Route path = '/register/employer' element = {<RegisterPage/>}/>
                        <Route path = '/login' element = {<LoginPage/>}/>
                    </Route>

                    <Route element = {<CheckLoggedIn/>}>
                        <Route element = {<CheckAccount/>}>
                            <Route path = '/profile/:userID' element = {<ProfilePage/>}/>
                            <Route path = '/create-profile' element = {<CreateProfilePage/>}/>
                        </Route>

                        <Route element = {<CheckAccount isJobSeeker = {false}/>}>
                            <Route path = '/create-company' element = {<CreateCompanyPage/>}/>
                            <Route path = '/companies' element = {<CompaniesPage/>}/>
                            <Route path = '/companies/:companyID' element = {<CompanyPage/>}/>
                        </Route>
                    </Route>

                </Routes>
            </Router>
        </div>
    )
}