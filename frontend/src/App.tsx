import React,{useEffect} from 'react'
import Navbar from './components/Global/Navbar/Navbar'
import PagesRoutes from './components/Global/PagesRoutes';
import {useAppDispatch} from './components/Global/features/hooks'
import {fetchUser} from './components/Global/features/user';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchUser())
  },[])

  return (
    <div>
      <Navbar/>
      <PagesRoutes/>
    </div>
    
  );
}

export default App;
