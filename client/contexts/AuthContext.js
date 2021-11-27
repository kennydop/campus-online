import { useContext, useState, useEffect, createContext, useCallback } from "react"
import axios from "axios"
import { useRouter } from "next/router"
const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

const uprotectedRoutes = ['/login', '/signup', '/', '/[profile]', '/404']

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	async function signup(email, password, username, name) {
		axios.post("http://localhost:5000/api/auth/register", {username, password, email, name}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      console.log(res)
      if(res.data.success === true){
        alert('signed up')
        setCurrentUser(res.data)
        return "signed up"
      }else{
        alert('exists')
        return "User with the " + Object.keys(res.data.keyValue)[0] + " " + res.data.keyValue[(Object.keys(res.data.keyValue)[0])] + " already exists"
      }
    }).catch((error)=>{
      console.log(error)
      alert(error)
    })
	}

	function login(username, password) {
    axios.post("http://localhost:5000/api/auth/login", {username, password}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      setCurrentUser(res.data)
      router.replace("/")
    }).catch((error)=>{
      alert("Incorrect Credentials")
    })
	}

	function logout() {
    router.replace("/login")
    axios.get("http://localhost:5000/api/auth/logout", { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'})
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
    setCurrentUser,
		logout,
	}
	
	return (
		<AuthContext.Provider value={value}>
		{!loading && children}
		</AuthContext.Provider>
		)
	}