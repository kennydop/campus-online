import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from './firebase'
import { removeUserCookie, setUserCookie, getUserFromCookie, getUserInfoFromCookie } from './userCookies'
import { mapUserData } from './mapUserData'

const useUser = () => {
    const [user, setUser] = useState()
    const [userInfo, setUserInfo] = useState()
    const router = useRouter()

    const logout = async () => {
        return auth.signOut().then(() => {
                // Sign-out successful.
                router.replace('/')
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        // Firebase updates the id token every hour, this
        // makes sure the react state and the cookie are
        // both kept up to date
        const cancelAuthListener = auth.onIdTokenChanged((user) => {
            if (user) {
                const userData = mapUserData(user)
                setUserCookie(userData)
                setUser(userData)
            } else {
                removeUserCookie()
                setUser()
            }
        })

        const userFromCookie = getUserFromCookie()
        if (!userFromCookie) {
            router.push('/')
            return
        }
       setUser(userFromCookie)

       const userInfoFromCookie = getUserInfoFromCookie()
       if (!userInfoFromCookie) {
           return
       }
          setUserInfo(userInfoFromCookie)

       return () => {
            cancelAuthListener()
        }

    }, [])

    return { user, userInfo, logout }
}

export { useUser }