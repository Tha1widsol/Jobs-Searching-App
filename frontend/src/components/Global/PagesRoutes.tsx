import React from 'react'
import {Routes,Route} from "react-router-dom"
import PublicHomePage from '../public/PublicHomePage/PublicHomePage'
import RegisterPage from '../public/RegisterPage/RegisterPage'
import LoginPage from '../public/LoginPage/LoginPage'
import ProfileFormPage from '../Jobseekers/ProfileFormPage/ProfileFormPage'
import {CheckLoggedIn,CheckAccount} from './ProtectedRoutes'
import JobSeekersHomePage from '../Jobseekers/JobSeekersHomePage/JobSeekersHomePage';
import EmployersHomePage from '../Employers/EmployersHomePage/EmployersHomePage';
import CompanyFormPage from '../Employers/CompanyFormPage/CompanyFormPage'
import CompaniesPage from '../Employers/CompaniesPage/CompaniesPage'
import {useAppSelector} from './features/hooks'
import ProfilePage from '../Jobseekers/ProfilePage/ProfilePage'
import CompanyPage from '../Employers/CompanyPage/CompanyPage'
import JobFormPage from '../Employers/JobFormPage/JobFormPage'
import EmployerJobsPage from '../Employers/EmployerJobsPage/EmployerJobsPage'
import JobPage from '../public/JobPage/JobPage'
import ApplicationPage from '../Jobseekers/ApplicationPage/ApplicationPage'
import JobSeekerApplicationsPage from '../Jobseekers/JobSeekerApplicationsPage.tsx/JobSeekerApplicationsPage'
import EmployerApplicantsPage from '../Employers/EmployerApplicantsPage/EmployerApplicantsPage'
import JobApplicantsPage from '../Employers/EmployerApplicantsPage/JobApplicantsPage/JobApplicantsPage'

export default function PagesRoutes() {
    const user = useAppSelector(state => state.user)

    return (
        <div>
            <Routes>
                <Route path = '/' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                <Route path = '/home' element = {user.isLoggedIn && user.values?.isAnEmployer ? <EmployersHomePage/> : user.isLoggedIn && user.values?.isAnEmployer === false ? <JobSeekersHomePage/> : <PublicHomePage/>}/>
                <Route path = '/job/:jobID' element = {<JobPage/>}/>
            
                <Route element = {<CheckLoggedIn checkLoggedIn = {false}/>}>
                    <Route path = '/register' element = {<RegisterPage/>}/>
                    <Route path = '/login' element = {<LoginPage/>}/>
                </Route>

                <Route element = {<CheckLoggedIn/>}>
                    <Route path = '/company/:companyID' element = {<CompanyPage/>}/>
                    <Route path = '/profile/:userID' element = {<ProfilePage/>}/>

                    <Route element = {<CheckAccount/>}>
                        <Route path = '/create-profile' element = {<ProfileFormPage/>}/>
                        <Route path = '/apply/:jobID' element = {<ApplicationPage/>}/>
                        <Route path = '/my-jobs' element = {<JobSeekerApplicationsPage/>}/>
                    </Route>

                    <Route element = {<CheckAccount isJobSeeker = {false}/>}>
                        <Route path = '/create-company' element = {<CompanyFormPage/>}/>
                        <Route path = '/edit-company/:companyID' element = {<CompanyFormPage edit = {true}/>}/>
                        <Route path = '/companies' element = {<CompaniesPage/>}/>
                        <Route path = '/post-job/:companyID' element = {<JobFormPage/>}/>
                        <Route path = '/edit-job/:jobID' element = {<JobFormPage edit = {true}/>}/>
                        <Route path = '/jobs' element = {<EmployerJobsPage/>}/>
                        <Route path = '/applicants' element = {<EmployerApplicantsPage/>}/>
                        <Route path = '/applicants/:jobID' element = {<JobApplicantsPage/>}/>
                    </Route>
                </Route>

            </Routes>
          
        </div>
    )
}