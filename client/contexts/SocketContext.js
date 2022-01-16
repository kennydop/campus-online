import axios from "axios"
import { useContext, useState, useEffect, createContext, useRef } from "react"
import { io } from "socket.io-client"
import { useActiveTab } from "./ActiveTabContext"
import { useAuth } from "./AuthContext"
import { useUtils } from "./UtilsContext"

const Socket = createContext()

export const useSocket = () => {
  return useContext(Socket)
}


export function SocketProvider({children}) {
  const { currentUser } = useAuth()
  const socket = useRef();
  const [user, setUser] = useState()
  const [online, setOnline] = useState()
  const [recievedMessage, setRecievedMessage] = useState()
  const [recievedPost, setRecievedPost] = useState()
  const { unreadChats, setUnreadNotifications, setUnreadChats, setRefreshFeedPosts, setNewPosts } = useUtils();
  const { tabActive } = useActiveTab()
  const sound = new Audio('/sounds/insight-578.mp3')

  useEffect(() => {
    async function getMyProfile(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`).then((res)=>{
        setUser(res.data)
      })
    }
    currentUser && getMyProfile()
  },[currentUser])

  //add user (online)
  useEffect(()=>{
    async function userIsOnline(){
      if(!online && currentUser){
        socket.current = io("http://localhost:5000", {withCredentials: true})
        socket.current.emit("addUser", currentUser._id)
      }
    }
    userIsOnline().then(setOnline(true))
  }, [socket.current, currentUser])
  
  //get socket infos
  useEffect(() => {
    if(online && currentUser){
      socket.current.on("newNotification", () => {
        setUnreadNotifications((oldVal) => {return oldVal + 1})
      });
      socket.current.on("getMessage",  async (data) => {
        setRecievedMessage(data)
      });
      socket.current.on("newPost",  async (data) => {
        setRecievedPost(data)
      });
    }
  }, [online]);

  useEffect(() => {
    if(recievedMessage){
      sound.play()
      if(tabActive[tabActive.length-1] !== "chat"){
        var targetId = unreadChats.findIndex(c=> c === recievedMessage.from)
        if(targetId === -1){
          setUnreadChats((oldVal)=> {return [...oldVal, recievedMessage.from]})
        }
      }
    }
  },[recievedMessage])

  useEffect(() => {
    if(recievedPost){
      if(recievedPost.id === currentUser._id){
        setRefreshFeedPosts(true)
      }else if(user?.followings.includes(recievedPost.id) || user?.college === recievedPost.college){
        setNewPosts((oldVal)=> {return oldVal + 1})
      }
    }
  },[recievedPost])
  
  const value = {
    socket: socket?.current,
  }

  return (
    <Socket.Provider value={value}>
      {children}
    </Socket.Provider>
  )
}

export default SocketProvider
