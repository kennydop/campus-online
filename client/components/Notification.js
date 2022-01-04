import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"

function Notification({notification}) {
  const [ from, setFrom ] = useState()
  const [ loading, setLoading ] = useState(true)
  const { currentUser } = useAuth()
  
  useEffect(()=>{
    async function getFrom(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+notification.from).then((res)=>{
        setFrom(res.data)
        setLoading(false)
      })
    }
    getFrom();
    console.log(notification)
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
    <div className='h-20 flex'>
      <div className={`h-full w-1 border-b border-gray-300 dark:border-bdark-50 ${notification.read?'bg-gray-400':'bg-pink-500'}`}></div>
      <div className={`overflow-hidden h-20 flex items-center justify-start border-b border-gray-300 dark:border-bdark-50 p-2 w-full text-gray-500 ${notification.read?'bg-blue-grey-50 dark:bg-bdark-200':''}`}>
        {
          (notification.type === "follow" || notification.type === "unfollow") && 
          <div className="flex w-full justify-between items-center overflow-hidden">
            <div className="flex space-x-2 items-center">
              <Link href={`/${from?.username}`}>
                <img src={notification.thumbnail} className = "h-10 w-10 avatar object-cover rounded-full cursor-pointer"/>
              </Link>
              <div className = "flex space-x-1.5">
                <Link href={`/${from?.username}`}>
                  <p className = "cursor-pointer fit-content">{from?.username}</p>
                </Link>
                <p>{notification.message}</p>
              </div>
            </div>
            <button className={`clicky h-8 w-24 rounded-full shadow-md  text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl ${from?.followers.indexOf(currentUser._id) > -1 ? 'bg-white dark:bg-bdark-200 text-pink-500 border border-pink-500' : 'bg-pink-500 text-white dark:text-gray-200' }`} onClick={followUser}>{from?.followers.indexOf(currentUser._id) > -1 ? "Unfollow" : "Follow"}</button>
          </div>
        }
        {
          (notification.type === "postLike" || notification.type === "postComment") &&
          <div className="flex w-full justify-between items-center py-2 overflow-hidden">
            <div className="flex space-x-1.5">
              <Link href={`/${from?.username}`}>
                <p className = "cursor-pointer fit-content">{from?.username}</p>
              </Link>
              <Link href={`/p/${notification.post}`}>
                <p className = "cursor-pointer">{notification.message}</p>
              </Link>
            </div>
            {notification.thumbnail && <Link href={`/p/${notification.post}`}><img src={notification.thumbnail} className = "w-12 h-12 object-cover cursor-pointer rounded-lg hover:opacity-50"/></Link>}
          </div>
        }
      </div>
    </div>
    :
    <div className="h-16 m-2 animate-pulse bg-gray-50 dark:bg-bdark-200 rounded-lg">
    </div>
  )
}

export default Notification
