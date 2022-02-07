import { useContext, useState, useEffect, createContext, useCallback } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { co_loading } from "../images/defaults"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

const unprotectedRoutes = ['/login', '/signup', '/forgotpassword', '/', '/u/[profile]', '/p/[post]']

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	const router = useRouter()


	function logout() {
    router.replace("/login")
    axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/auth/logout", { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'})
	}

  const verifyUser = useCallback(() => {
    axios.put(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/auth/refreshtoken", {}, {withCredentials: true, credentials: 'include'}).then(async (res)=>{
      setCurrentUser(res.data)
      if(!unprotectedRoutes.includes(router.pathname)){
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
      if(!unprotectedRoutes.includes(router.pathname)){
        setLoading(true)
        await router.replace({
          pathname: '/login',
          query: { returnUrl: router.pathname }
        }).then(()=>{setLoading(false)})
      }else{
        setLoading(false)
      }
      console.log(error)
    })
    // call refreshToken every 15 minutes to renew the authentication token.
    setTimeout(verifyUser, 15 * 60 * 1000)
  }, [setCurrentUser])


  useEffect(() => {
    verifyUser()
  }, [verifyUser])


	const value = {
		currentUser,
    setCurrentUser,
		logout,
	}
	
	return (
		<AuthContext.Provider value={value}>
		{loading ? 
      <div className="flex h-screen w-screen items-center justify-center">
        {co_loading}
      </div>
    :
    children}
		</AuthContext.Provider>
		)
	}
