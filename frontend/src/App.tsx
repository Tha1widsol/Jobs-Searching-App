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
    if(!token) return

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
                    is_an_employer: data.is_an_employer,
                    logged_in: true
                })
            )
          
        }

        else dispatch(logout())
    })

    .catch(error => {
        console.log(error)
    })

},[dispatch,token])

  return (
    <div>
      <Navbar/>
      <div id = 'gap'></div>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
