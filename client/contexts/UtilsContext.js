import axios from "axios"
import { useContext, useState, createContext, useEffect, useRef } from "react"
import { useAuth } from "./AuthContext"
import { useTheme } from 'next-themes'

const Utils = createContext()

export function useUtils(){
  return useContext(Utils)
}

export function UtilsContext({children}){
  const [unreadChats, setUnreadChats] = useState([])
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [newPosts, setNewPosts] = useState(0)
  const [refreshPosts, setRefreshPosts] = useState()
  const { currentUser } = useAuth()
  const {theme, resolvedTheme, setTheme} = useTheme()

  useEffect(()=>{
    async function getUnreadChats(){
      if(!unreadChats && currentUser){
        axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/chats/unread/"+currentUser._id).then((res)=>{
          setUnreadChats(res.data)
        })
      }
    }
    async function getUnreadNotifications(){
      if(!unreadNotifications && currentUser){
        axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/notifications/unread/"+currentUser._id).then((res)=>{
          setUnreadNotifications(res.data)
        })
      }
    }
    getUnreadChats()
    getUnreadNotifications()
  },[])

  useEffect(()=>{
    if(currentUser?.preferences){
      if(!currentUser.preferences.theme){
        setTheme(resolvedTheme)
      }else{
        setTheme(currentUser.preferences.theme)
      }
    }else{
      if(!theme || theme === 'system'){
        setTheme(resolvedTheme)
      }
    }
  },[currentUser])

  const value = {
    unreadChats,
    unreadNotifications,
    newPosts,
    refreshPosts, 
    setUnreadChats,
    setUnreadNotifications,
    setNewPosts,
    setRefreshPosts
  }
  
  return(
    <Utils.Provider value={value}>
      {children}
    </Utils.Provider>
  )
}