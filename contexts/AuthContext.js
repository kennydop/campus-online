import { useContext, useState, useEffect, createContext } from "react"
import { auth, firebaseApp } from "../firebase/firebase"

const AuthContext = createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [loading, setLoading] = useState(true)
	
	function signup(email, password, name) {
		return auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
			userAuth.user.updateProfile({
				displayName: name,
			})
		})
	}
	
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
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
	
	
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
		
		return unsubscribe
	}, [])
	
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