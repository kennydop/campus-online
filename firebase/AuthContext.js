import { useContext, useState, useEffect, createContext } from "react"
import { auth } from "./firebase"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	
	function signup(email, password, name, pp) {
		return auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
			userAuth.user.updateProfile({
				displayName: name,
				photoURL: pp
			})
		})
	}
	
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}
	
	function logout() {
		return auth.signOut()
	}
	
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
		
		return unsubscribe
	}, [])
	
	const value = {
		currentUser,
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