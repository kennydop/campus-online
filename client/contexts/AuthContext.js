import { useContext, useState, useEffect, createContext, useCallback } from "react"
import { auth, firebaseApp } from "../firebase/firebase"
import axios from "axios"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	
	// async function signup(email, password, name) {
	// 	return auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
	// 		userAuth.user.updateProfile({
	// 			displayName: name,
	// 		})
	// 	})
	// }
	async function signup(email, password, username) {
		axios.post("http://localhost:5000/api/auth/register", {username, password, email}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      console.log(res)
      setCurrentUser(res.data)  
      return currentUser
    }).catch((error)=>{
      console.log(error)
      throw error
    })
    // fetch("http://localhost:5000/api/auth/register", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password, email }),
    // }).then(async res=>{
    //     setCurrentUser(await res.json())
    //     // localStorage.setItem("token", res.data.token)  
    //     return currentUser
    //   }).catch((error)=>{
    //     console.log(error)
    //     throw error
    //   })

	}

	function login(username, password) {
    axios.post("http://localhost:5000/api/auth/login", {username, password}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      console.log(res)  
      setCurrentUser(res.data)
      return currentUser
    }).catch((error)=>{
      return error
    })

    // fetch("http://localhost:5000/api/auth/login", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username, password }),
    // }).then(async res=>{
    //   setCurrentUser(await res.json())
    //   return currentUser
    //   }).catch((error)=>{
    //     console.log(error)
    //     throw error
    //   })
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
		return auth.signOut()
	}
	
	
	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged(user => {
	// 		setCurrentUser(user)
	// 		setLoading(false)
	// 	})
		
	// 	return unsubscribe
	// }, [])

  // useEffect(() => {
  //   if(currentUser.token){
  //     axios.get("http://localhost:5000/api/users/currentUser",{ headers: {Authorization: `Bearer ${currentUser.token}`}}).then((res)=>{
  //       setCurrentUser(res.data)
  //       console.log(res.data)
  //     }).catch((error)=>{
  //       console.log(error)
  //       return error
  //     })
  //   }
	// }, [])

  const verifyUser = useCallback(() => {
    axios.put("http://localhost:5000/api/auth/refreshtoken", {}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      setCurrentUser(res.data)
      setLoading(false)
    }).catch((error)=>{
      setCurrentUser((oldValues) => {
        return { ...oldValues, token: null }
      })
      setLoading(false)
      console.log(error)
    })
    // call refreshToken every 5 minutes to renew the authentication token.
    setTimeout(verifyUser, 5 * 60 * 1000)
  }, [setCurrentUser])

//   fetch("http://localhost:5000/api/auth/refreshtoken", {
//     method: "PUT",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//   }).then(async response => {
//     if (response.ok) {
//       const data = await response.json()
//       setCurrentUser(data)
//       setLoading(false)
//     } else {
//       setCurrentUser(oldValues => {
//         return { ...oldValues, token: null }
//       })
//       setLoading(false)
//     }
//     // call refreshToken every 5 minutes to renew the authentication token.
//     setTimeout(verifyUser, 5 * 60 * 1000)
//   })
// }, [setCurrentUser])

  useEffect(() => {
    verifyUser()
  }, [verifyUser])

  async function getUserInfo(token){
    if(currentUser.token){
      console.log(currentUser)
      axios.get("http://localhost:5000/api/users/currentUser",{ headers: {Authorization: `Bearer ${token}`}}).then((res)=>{
        setCurrentUser(res.data)
        console.log(res.data)
        return res.data
      }).catch((error)=>{
        console.log(error)
        return error
      })
  }else{
    console.log("no token")
  }
  }
	const value = {
		currentUser,
    setCurrentUser,
    getUserInfo,
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