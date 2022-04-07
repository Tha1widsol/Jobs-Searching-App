import React,{useEffect} from 'react'
import Navbar from './components/Global/Navbar/Navbar'
import {useAppDispatch} from './components/Global/features/hooks';
import PagesRoutes from './components/Global/PagesRoutes';
import {fetchUser,logout,token} from './components/Global/features/Auth/user';
import SuccessAlert from './components/Global/messages/SuccessAlert';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!token) dispatch(logout())
    dispatch(fetchUser())
  },[dispatch])

  return (
    <div style = {{width: '95%', margin: '0 auto'}}>
      <Navbar/>
      <SuccessAlert/>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
