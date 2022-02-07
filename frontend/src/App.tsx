import React,{useEffect} from 'react'
import Navbar from './components/Global/Navbar/Navbar'
import {useAppDispatch} from './components/Global/features/hooks';
import PagesRoutes from './components/Global/PagesRoutes';
import {fetchUser} from './components/Global/features/user';
import SuccessAlert from './components/Global/messages/SuccessAlert';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchUser())
  },[dispatch])

  return (
    <div>
      <Navbar/>
      <SuccessAlert/>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
