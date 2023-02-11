import React,{ useState, useEffect, ReactNode, useContext } from 'react'
import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
     function signOut(){
        return auth.signOut()
    }
    
   
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        signOut
    }
    
  return (
   <AuthContext.Provider value = {value}>
     {children}
   </AuthContext.Provider>
  )
  
  }
