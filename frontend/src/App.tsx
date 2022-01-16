import React,{useEffect} from 'react'
import Navbar from './components/Global/Navbar/Navbar'
import PagesRoutes from './components/Global/PagesRoutes';
import {useAppDispatch} from './components/Global/features/hooks'
import {login,logout} from './components/Global/features/user'
import axios from 'axios'

function App() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if(!token || token === '') return

     axios.get('/api/currentUser',{
        headers: {
            Authorization:`Token ${token}`
        }
    })
    
    .then(response => {
        const data = response.data
        
        if (data.email){
            dispatch(
                login({
                    id: data.id,
                    email: data.email,
                    isAnEmployer: data.is_an_employer,
                    loggedIn: true
                })
            )
          
        }

        else dispatch(logout())
    })

    .catch(error => {
        console.log(error)
    })

},[token,dispatch])

  return (
    <div>
      <Navbar/>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
