import { useContext, useState, useEffect, createContext, useCallback } from "react"
import { auth, firebaseApp } from "../firebase/firebase"
import axios from "axios"
import { useRouter } from "next/router"
const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

const uprotectedRoutes = ['/login', '/signup']

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	async function signup(email, password, username) {
		axios.post("http://localhost:5000/api/auth/register", {username, password, email}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      console.log(res)
      setCurrentUser(res.data)  
      return currentUser
    }).catch((error)=>{
      console.log(error)
      throw error
    })
	}

	function login(username, password) {
    axios.post("http://localhost:5000/api/auth/login", {username, password}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      console.log(res)  
      setCurrentUser(res.data)
      return currentUser
    }).catch((error)=>{
      return error
    })
	}
	
	function loginWithProvider(pvd){
		var provider;
		switch(pvd){
			case 'facebook':
				provider = new firebaseApp.auth.FacebookAuthProvider();
				break;
			case 'google':
				provider = new firebaseApp.auth.GoogleAuthProvider();
				break;
			case 'twitter':
				provider = new firebaseApp.auth.TwitterAuthProvider();
				break;
		}

		return auth.signInWithRedirect(provider)
	}

	function logout() {
		axios.get("http://localhost:5000/api/auth/logout", { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then(()=>{
      setCurrentUser(null)
      router.replace("/")
    })
	}

  const verifyUser = useCallback(() => {
    axios.put("http://localhost:5000/api/auth/refreshtoken", {}, {withCredentials: true, credentials: 'include'}).then(async (res)=>{
      setCurrentUser(res.data)
      if(!uprotectedRoutes.includes(router.pathname)){
        if(res.data.token){
          setLoading(false)
        }else{
          setLoading(true)
          await router.replace({
            pathname: '/login',
            query: { returnUrl: router.pathname }
          }).then(()=>{setLoading(false)})
        }
      }else{
        setLoading(false)
      }
    }).catch(async (error)=>{
      if(!uprotectedRoutes.includes(router.pathname)){
        setLoading(true)
        await router.replace({
          pathname: '/login',
          query: { returnUrl: router.pathname }
        }).then(()=>{setLoading(false)})
      }else{
        setLoading(false)
      }
    })
    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyUser, 5 * 60 * 1000)

  }, [setCurrentUser])


  useEffect(() => {
    verifyUser()
  }, [verifyUser])

	const value = {
		currentUser,
		loginWithProvider,
		login,
		signup,
		logout,
	}
	
	return (
		<AuthContext.Provider value={value}>
		{!loading && children}
		</AuthContext.Provider>
		)
	}