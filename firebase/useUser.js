import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from './firebase'
import { removeUserCookie, setUserCookie, getUserFromCookie, getUserInfoFromCookie } from './userCookies'
import { mapUserData } from './mapUserData'

const useUser = () => {
    const [user, setUser] = useState()
    const router = useRouter()

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

       return () => {
            cancelAuthListener()
        }

    }, [])

    return { user }
}

export { useUser }