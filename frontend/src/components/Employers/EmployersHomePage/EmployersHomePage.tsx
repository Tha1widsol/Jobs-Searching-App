import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {fetchProfiles} from '../../Global/features/Jobseekers/profiles/profiles';

export default function EmployersHomePage() {
  const dispatch = useAppDispatch()
  const profiles = useAppSelector(state => state.profiles)
  const [dropdown,setDropdown] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchProfiles())
  },[dispatch])

  return (
        <div>
            <label><h2>{profiles.values?.length ? 'Potential candidates based on your jobs...' : 'No potential candidates'}</h2></label>
            {profiles.status !== 'rejected' ? 
             <section style = {{display: 'flex', marginRight: '15px'}}>
             {profiles.values?.map((profile,index) => {
                 return(
                     <div className = 'featuredContainer' key = {index}>
                        <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                            <Link to = {`/profile/${profile.user.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                            <button className = 'dropdownBtn'>Hide</button>
                            <button className = 'deleteNavBtn'>Report</button>
                        </KebabMenu>

                         <Link to = {`/profile/${profile.user.id}`}><h2>{profile.firstName} {profile.middleName} {profile.lastName}</h2></Link>
                         <p>(Looking for work)</p>
                         <p><i className = 'fa fa-phone icon'></i>000011111</p>
                         <p><i className = 'icon'>&#9993;</i>{profile.user.email}</p>
                         <hr className = 'mt-0-mb-4'/>

                         <label><h3>Skills:</h3></label>
                         <section className = 'listContainer'>
                             {profile.skills.map((skill,index) => {
                                 return (<li key = {index}>{skill.name}</li>)
                             })}
                         </section>

                         <hr className = 'mt-0-mb-4'/>
                         <p className = 'containerText'>{profile.experience}</p>
                         <section style = {{textAlign:'center'}}>
                             <button>Shortlist</button>
                             <button>Message</button>
                         </section>   
                     </div>
                 )
             })}
         </section> : <p>No potential candidates</p>}

        </div>
    )
}
