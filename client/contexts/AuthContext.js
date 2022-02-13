import { useContext, useState, useEffect, createContext, useCallback } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { co_loading } from "../images/defaults"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

const uprotectedRoutes = ['/login', '/signup', '/forgotpassword', '/', '/[profile]', '/p/[post]']

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	const router = useRouter()


	function logout() {
    router.replace("/login")
    axios.get("http://localhost:5000/api/auth/logout", { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'})
	}
  const verifyUser = () => {
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
  }


  useEffect(() => {
    verifyUser()
  }, [])


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