import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector,useAppDispatch, useQuery} from '../../../app/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {fetchProfiles} from '../../../features/Jobseekers/profiles/profiles';
import SearchBar from '../../public/SearchBar/SearchBar';

export default function EmployersHomePage() {
  const dispatch = useAppDispatch()
  const query = useQuery()
  const profiles = useAppSelector(state => state.profiles)
  const [dropdown,setDropdown] = useState<number | null>(null)
  const searchVal = query.get('q')

  useEffect(() => {
    dispatch(fetchProfiles(searchVal || ''))
  },[dispatch, searchVal])
  
  return (
        <div>
            <SearchBar 
            placeholder = 'Search Profiles...'
            />
            <label><h2>{profiles.values?.length ? 'Potential candidate matches based on your jobs...' : 'No candidates found...'}</h2></label>
            {profiles.status === 'success' ? 
             <section className = 'row' style = {{marginRight: '15px'}}>
             {profiles.values?.map((profile,index) => {
                 return(
                     <div className = 'featuredContainer' key = {index}>
                        <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                            <Link to = {`/profile/${profile.user.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                            <button className = 'dropdownBtn'>Hide</button>
                            <button className = 'dropdownBtn redNavBtn'>Report</button>
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

                         <section style = {{textAlign:'center', marginTop: '20px'}}>
                             <button>Shortlist</button>
                             <button>Message</button>
                         </section>   
                     </div>
                 )
             })}
         </section> : profiles.status === 'loading' ? <p>Loading...</p> : null}

        </div>
    )
}
