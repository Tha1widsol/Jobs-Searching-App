import React,{ useState, useEffect, ReactNode, useContext } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = React.createContext()


export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function signIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    
     function signOut(){
        return auth.signOut()
    }
    
    
   
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
            return unsubscribe
    }, [loading])

  
    const value = {
        currentUser,
        signup,
        signOut,
        signIn
    }
    
  return (
   <AuthContext.Provider value = {value}>
     {!loading && children}
   </AuthContext.Provider>
  )
  
  }
