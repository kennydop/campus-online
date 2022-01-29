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
  const [refreshFeedPosts, setRefreshFeedPosts] = useState()
  const [refreshGlobalPosts, setRefreshGlobalPosts] = useState()
  const [feedScroll, setFeedScroll] = useState()
  const [globalScroll, setGlobalScroll] = useState()
  const [suggestions, setSuggestions] = useState()
  const [trending, setTrending] = useState()
  const { currentUser } = useAuth()
  const {theme, resolvedTheme, setTheme} = useTheme()

  //getting unread chats
  useEffect(()=>{
    async function getUnreadChats(){
      if(unreadChats.length === 0 && currentUser){
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

  //getting suggestions
  useEffect(()=>{
    if(currentUser){
      async function getSuggestionsForLoggedInUser(){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}/suggestions`).then((res)=>{
          setSuggestions(res.data)
        })
      }
      getSuggestionsForLoggedInUser()
    }else{
      async function getSuggestionsForNotLoggedInUser(){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/suggestions/nl`).then((res)=>{
          setSuggestions(res.data)
        })
      }
      getSuggestionsForNotLoggedInUser()
    }
  },[currentUser])

  //getting trending
  useEffect(()=>{
    async function getTrending(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/trending").then(res=>{
        setTrending(res.data)
      })
    }
    getTrending()
  },[])

  const value = {
    unreadChats,
    unreadNotifications,
    newPosts,
    refreshFeedPosts,
    refreshGlobalPosts,
    feedScroll,
    globalScroll,
    suggestions,
    trending,
    setUnreadChats,
    setUnreadNotifications,
    setNewPosts,
    setRefreshFeedPosts,
    setRefreshGlobalPosts,
    setFeedScroll,
    setGlobalScroll
  }
  
  return(
    <Utils.Provider value={value}>
      {children}
    </Utils.Provider>
  )
}
