import React,{useEffect} from 'react'
import Navbar from './components/Global/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from './app/hooks';
import PagesRoutes from './components/Global/PagesRoutes';
import { setUser } from './features/Auth/user';
import SuccessAlert from './components/Global/messages/SuccessAlert';
import { AuthProvider } from './contexts/AuthContext';
import useAxiosPrivate from './hooks/useAxiosPrivate';

function App() {
  const dispatch = useAppDispatch()
  const axiosPrivateInstance = useAxiosPrivate()
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    async function getUser() {
        const { data } = await axiosPrivateInstance.get('auth/user')
        console.log(data)
        dispatch(setUser({id: data?.id, email: data?.email, isHired: data?.isHired, isAnEmployer: data?.isAnEmployer}))
    }


    getUser()
}, [])



  return (
    <AuthProvider>
       <div style = {{width: '95%', margin: '0 auto'}}>
          <Navbar/>
          <SuccessAlert/>
          <PagesRoutes/>
        </div>
    </AuthProvider>
  
  );
}

export default App;
