import React,{useState,useEffect} from 'react';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
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
            <h1>Employers home page</h1>
            {profiles.values?.map(profile => {
                return(
                    <h2>{profile.firstName}</h2>
                )
            })}
        </div>
    )
}
