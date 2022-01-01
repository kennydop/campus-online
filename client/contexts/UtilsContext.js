import axios from "axios"
import { useContext, useState, createContext, useEffect, useRef } from "react"
import { useAuth } from "./AuthContext"
import { io } from "socket.io-client";

const Utils = createContext()

export function useUtils(){
  return useContext(Utils)
}

export function UtilsContext({children}){
  const [unreadChats, setUnreadChats] = useState()
  const [online, setOnline] = useState()
  const [unreadNotifications, setUnreadNotifications] = useState()
  const { currentUser } = useAuth()
  const socket = useRef();

  //add user (online)
  useEffect(()=>{
    async function userIsOnline(){
      if(!online && currentUser){
        console.log("digggg")
        socket.current = io("http://localhost:5000", {withCredentials: true})
        socket.current.emit("addUser", currentUser._id)
      }
    }
    userIsOnline().then(setOnline(true))
  }, [socket.current, currentUser])

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

  const value = {
    unreadChats,
    unreadNotifications,
    setUnreadChats,
    setUnreadNotifications
  }
  
  return(
    <Utils.Provider value={value}>
      {children}
    </Utils.Provider>
  )
}