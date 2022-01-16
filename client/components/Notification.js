import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useSocket } from "../contexts/SocketContext"
import TimePast from "./TimePast"

function Notification({notification}) {
  const [ from, setFrom ] = useState()
  const [ loading, setLoading ] = useState(true)
  const { currentUser } = useAuth()
  const { socket } = useSocket()

  useEffect(()=>{
    async function getFrom(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+notification.from).then((res)=>{
        setFrom(res.data)
        setLoading(false)
      })
    }
    getFrom();
  },[notification])

  //follow/unfollow
  function followUser(){
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${from._id}/follow`, {userId: currentUser?._id}).then((res)=>{
      if(res.data === "user has been unfollowed"){
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: from._id,
          type: "unfollow",
        })
      }else{
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: from._id,
          type: "follow",
        })
      }
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+notification.from).then((res)=>{
        setFrom(res.data)
      })
    })
  }

  return (
    !loading ?
    <div className='flex'>
      <div className={`flex-grow w-1 border-b border-gray-300 dark:border-bdark-50 ${notification.read?'bg-gray-400':'bg-pink-500'}`}></div>
      <div className={`overflow-hidden h-full flex items-center justify-start border-b border-gray-300 dark:border-bdark-50 p-2 w-full text-gray-500 dark:text-gray-400 ${notification.read?'bg-blue-grey-50 dark:bg-bdark-200':''}`}>
        {
          (notification.type === "follow" || notification.type === "unfollow") ?
          <div className="flex w-full justify-between items-center overflow-hidden h-full">
            <Link href={`/u/${from?.username}`}>
              <div className="flex space-x-3 items-center w-10/12 h-full cursor-pointer">
                <img src={notification.thumbnail} className = "h-10 w-10 avatar object-cover rounded-full cursor-pointer"/>
                <div className="w-full">
                  <span className="truncate whitespace-pre-wrap break-all w-full">
                    <span className="font-semibold">{from?.username}</span>
                    <span className="">{` ${notification.message} `}</span>
                    <TimePast date={new Date(notification.createdAt)}/>
                  </span>
                </div>
              </div>
            </Link>
            <button className={`clicky h-7 w-20 rounded-full shadow-md  text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl ${from?.followers.indexOf(currentUser._id) > -1 ? 'bg-white dark:bg-bdark-200 text-pink-500 border border-pink-500' : 'bg-pink-500 text-white dark:text-gray-200' }`} onClick={followUser}>{from?.followers.indexOf(currentUser._id) > -1 ? "Unfollow" : "Follow"}</button>
          </div>
          :
          <Link href={`/p/${notification.post}`}>
            <div className="flex w-full justify-between items-center overflow-hidden cursor-pointer h-full">
              <div className={`${notification.thumbnail ? 'w-10/12' : 'w-full'}`}>
                <span className="truncate whitespace-pre-wrap break-all w-full">
                  <Link href={`/u/${from?.username}`}>
                    <span className="font-semibold">{from?.username}</span>
                  </Link>
                    <span>{` ${notification.message} `}</span>
                    <TimePast date={new Date(notification.createdAt)}/>
                </span>
              </div>
              {notification.thumbnail && <Link href={`/p/${notification.post}`}><img src={notification.thumbnail} className = "w-12 h-12 object-cover cursor-pointer rounded-sm hover:opacity-50"/></Link>}
            </div>
          </Link>
        }
      </div>
    </div>
    :
    <div className="h-16 m-2 animate-pulse bg-gray-50 dark:bg-bdark-200 rounded-lg"/>
  )
}

export default Notification
