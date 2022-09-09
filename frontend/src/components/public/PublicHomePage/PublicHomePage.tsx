import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../Global/features/hooks'
import JobSearchBar from '../SearchBar/JobSearchBar'
import {useQuery} from '../../Global/features/hooks';
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import { fetchHomePageJobs } from '../../Global/features/Public/homePageJobs';
import './css/HomePage.css'

export default function PublicHomePage() {
    const dispatch = useAppDispatch()
    const query = useQuery()
    const jobs = useAppSelector(state => state.homePageJobs)
    const [dropdown,setDropdown] = useState<number | null>(null)
    const searchVal = query.get('q')

    useEffect(() => {
        dispatch(fetchHomePageJobs(searchVal || ''))
    },[dispatch])

    return (
        <div>
            <JobSearchBar/>
            {jobs.values.length ? 
                <div>
                <label><h2>Potential job matches...</h2></label>
                <section style = {{display: 'flex', marginRight: '15px'}}>
                    {jobs.values?.map((job, index) => {
                    return (
                        <div className = 'featuredContainer' key = {index}>
                        <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                            <Link to = {`/job/${job?.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                            <button className = 'dropdownBtn'>Hide</button>
                            <button className = 'dropdownBtn redNavBtn'>Report</button>
                        </KebabMenu>
            
                        <Link to = {`/job/${job?.id}`}><h2>{job?.title}</h2></Link>
                        <p style = {{color: 'gray'}}> ??% - matching score</p>
                        
                        <Link to = {`/company/${job.company?.id}`}><p>{job.company?.name}</p></Link>
                        {job.salary2 ? <p>{job.currency}{job.salary1} - {job.currency}{job.salary2} a year </p> : <p>{job.currency}{job.salary1} a year</p>} 
                        <p>{job.type}</p>
                        <hr className = 'mt-0-mb-4'/>
                        
                        <label><h3>Description:</h3></label>
                        <p className = 'containerText'>{job.description}</p>
                    
                        <label><h3>Roles:</h3></label>
                            <section className = 'listContainer'>
                                {job.roles.map((role, index) => {
                                    return (<li key = {index}>{role.name}</li>)
                                })}
                            </section>
                        
                        <section style = {{textAlign:'center', marginTop: '20px'}}>
                            {job.applyOnOwnWebsite ? 
                                <a href = {job.link} target = 'blank'><button>Apply Externally</button></a>
                            : <Link to = {`/apply/${job.id}`}><button>Apply</button></Link>}
                        </section>   
            
                        </div>
                    )
                    })}
                </section>
                </div>
                : <h2>No jobs found...</h2>}

                <hr className = 'mt-0-mb-4'/>

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
        </div>
    )
}