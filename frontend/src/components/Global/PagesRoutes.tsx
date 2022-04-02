import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import ProfileFormPage from '../Jobseekers/ProfileFormPage/ProfileFormPage'
import {CheckLoggedIn,CheckAccount} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import CreateCompanyPage from '../Employers/CompanyFormPage/CompanyFormPage'
import CompaniesPage from '../Employers/CompaniesPage/CompaniesPage'
import {useAppSelector} from './features/hooks'
import ProfilePage from '../Jobseekers/ProfilePage/ProfilePage'
import CompanyPage from '../Employers/CompanyPage/CompanyPage'
import JobFormPage from '../Employers/JobFormPage/JobFormPage'
import EmployerJobsPage from '../Employers/EmployerJobsPage/EmployerJobsPage'
import JobPage from '../public/JobPage/JobPage'

export default function PagesRoutes() {
    const user = useAppSelector(state => state.user)

    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                    <Route path = '/home' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                    <Route path = '/job/:jobID' element = {<JobPage/>}/>
                
                    <Route element = {<CheckLoggedIn checkLoggedIn = {false}/>}>
                        <Route path = '/register' element = {<RegisterPage/>}/>
                        <Route path = '/login' element = {<LoginPage/>}/>
                    </Route>

                    <Route element = {<CheckLoggedIn/>}>
                    <Route path = '/companies/:companyID' element = {<CompanyPage/>}/>
                    
                        <Route element = {<CheckAccount/>}>
                            <Route path = '/profile/:userID' element = {<ProfilePage/>}/>
                            <Route path = '/create-profile' element = {<ProfileFormPage/>}/>
                        </Route>

                        <Route element = {<CheckAccount isJobSeeker = {false}/>}>
                            <Route path = '/create-company' element = {<CreateCompanyPage/>}/>
                            <Route path = '/companies' element = {<CompaniesPage/>}/>
                            <Route path = '/post-job/:companyID' element = {<JobFormPage/>}/>
                            <Route path = '/jobs' element = {<EmployerJobsPage/>}/>
                        </Route>
                    </Route>

                </Routes>
            </Router>
        </div>
    )
}