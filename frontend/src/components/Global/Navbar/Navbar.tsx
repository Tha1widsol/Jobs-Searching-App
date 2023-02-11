import React,{useState, useEffect} from 'react'
import {useAppSelector, useAppDispatch} from '../../../app/hooks'
import { fetchCompanies } from '../../../features/Employers/companies/companies'
import { fetchApplications } from '../../../features/Jobseekers/applications/applications'
import {fetchJobs} from '../../../features/Employers/jobs/jobs'
import {CompanyProps} from '../../../features/Employers/companies/company'
import {fetchCurrentCompany} from '../../../features/Employers/companies/currentCompany'
import {NavLink} from 'react-router-dom'
import {token,logout} from '../../../features/Auth/user'
import axios from 'axios'
import './css/Navbar.css'
import { handleAddSuccessMsg } from '../messages/SuccessAlert'
import { useAuth } from '../../../contexts/AuthContext'

export default function Navbar() {
    const user = useAppSelector(state => state.user)
    const {currentUser} = useAuth()
    const [dropdown,setDropdown] = useState({menu: false, companies: false})
    const [toggleChannelClicked, setToggleChannelClicked] = useState(false)
    const companies = useAppSelector(state => state.companies)
    const currentCompany = useAppSelector(state => state.currentCompany)
    const {signOut } = useAuth()
    const dispatch = useAppDispatch()

    
    useEffect(() => {
        if (!user.values?.isAnEmployer) return
        dispatch(fetchApplications('jobseekers'))
        dispatch(fetchCompanies())
        dispatch(fetchApplications('employers'))
        dispatch(fetchCurrentCompany())
        dispatch(fetchJobs('employer'))
    },[dispatch, toggleChannelClicked, user.values?.isAnEmployer])

    function handleLogout(){
        const requestOptions = { 
            headers: { 
            Authorization:`Token ${token}`
          }
        }
        axios.post('/api/auth/logout',null,requestOptions)
        .catch(error => {
            console.log(error)
        })
        
        setDropdown({menu: false, companies: false})
        signOut()
        dispatch(logout())
    }

    function handleSwitchChannel(company: CompanyProps['values']){
        const requestOptions = { 
            headers: { 
            Authorization:`Token ${token}`
          }
        }
        axios.put(`/api/currentCompany?id=${company.id}`,null, requestOptions)
        .then(response => {
            if (response.status === 200){
                handleAddSuccessMsg('Company is successfully changed', dispatch)
                setToggleChannelClicked(!toggleChannelClicked)
                setDropdown({menu: false, companies: false})
            }
        })
    }
    
    return (
        <div className = 'nav' id = 'head-nav'>
            <NavLink to = '/'  id = 'firstcast'>FirstCast</NavLink>
            <NavLink to = '/home'>Home</NavLink>
            {user.isLoggedIn ? 
            <div>
                {user.values?.isAnEmployer ? 
                <>
                    <NavLink to = {`/company/${currentCompany.values?.id}`}>My company</NavLink> 
                    <NavLink to = '/applicants'>Applicants</NavLink> 
                    <NavLink to = {`/post-job/${currentCompany.values?.id}`}>Post Job</NavLink> 
                </>
                :
                <>
                  <NavLink to = '/find-companies'>Find companies</NavLink> 
                  <NavLink to = '/salaries'>Find salaries</NavLink> 
                </>
             }
            </div>
            : 
            <>
                <NavLink to = '/about'>About</NavLink>
                <NavLink to = '/contact'>Contact</NavLink>
            </>
            }

             {user.isLoggedIn ?
             <div>
                <div className = 'dropdown'> 
                <button id = 'navDropBtn' onClick={() => setDropdown({menu: !dropdown.menu, companies: false})}>My account</button>
                  {dropdown.menu ?  
                    <div className = 'dropdown-content'>
                            {user.values?.isAnEmployer ? 
                             <>
                                {dropdown.companies ? 
                                <>
                                <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <p style = {{fontSize: 'small'}}>{currentCompany.values?.name}</p>
                                    <button id = 'navDropBtn' onClick = {() => setDropdown({menu: true, companies: false})}>Return</button>
                                </div> 
                                    {companies.values?.map((company, index) => {
                                        return (
                                            <div key = {index}>
                                                <button id = 'navDropBtn' onClick = {() => handleSwitchChannel(company)}>{company.name}</button>
                                            </div>
                                        )
                                    })}
                                    <NavLink to = '/create-company' onClick = {() => setDropdown({menu: false, companies: false})}>Add</NavLink>
                                    </>
                                    : 
                                    <>
                                      <button id = 'navDropBtn' onClick = {() => setDropdown({menu: true, companies: true})}>Switch company</button>
                                      <NavLink to = '/jobs' onClick = {() => setDropdown({menu: false, companies: false})}>My jobs</NavLink> 
                                    </>
                                    }


                             </> 
                            
                            : <>
                                <NavLink to = {`/profile/${user.values?.id}`} onClick = {() => setDropdown({menu: false, companies: false})}>My Profile</NavLink>
                                <NavLink to  = '/my-jobs?tab=applications' onClick = {() => setDropdown({menu: false, companies: false})}>My Jobs</NavLink>
                              </>
                              }
                         <NavLink to = '/' onClick = {handleLogout}>Logout</NavLink>
                        </div> : 
                        null}
  
                  </div>
              </div>: 

              <NavLink to = '/login' onClick = {() => setDropdown({menu: false, companies: false})} >Login</NavLink>}
              {user.isLoggedIn ? <p id = 'loggedinMessage'>Welcome, {JSON.stringify(currentUser)}</p> : null}
        </div>
    )
}