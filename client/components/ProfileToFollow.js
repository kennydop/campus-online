/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import { useState } from 'react'
import Link from "next/link"
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext';

function ProfileToFollow({name, username , pic, college, id, isfollowing, page, il}) {
  const { currentUser } = useAuth();
  const [buttonText, setButtonText] = useState(isfollowing ? 'Unfollow' : 'Follow')
  const { socket } = useSocket()

  function followUser(){
    setButtonText(buttonText==="Follow"?"Unfollow":"Follow")
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${id}/follow`, {userId: currentUser._id}).then((res)=>{
    if(res.data === "user has been followed"){
        setButtonText('Unfollow')
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: id,
          type: "follow",
        })
      }else if(res.data === "user has been unfollowed"){
        setButtonText('Follow')
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: id,
          type: "unfollow",
        })
      }
    })
  }

  return (
    page ?
    <div className={`flex flex-col items-center justify-center bg-white dark:bg-bdark-100 text-gray-500 dark:text-gray-400 p-2 rounded-lg shadow-md dark:shadow-lg ${il ? 'mx-1.5 w-40' : 'm-2 md:m-4'}`}>
      <div className='h-16 w-16 rounded-full overflow-hidden my-2'>
        <Link href={`/${username}`}><img
          alt={`${name}'s profile picture`}
          className='object-cover rounded-full cursor-pointer h-16 w-16'
          src={pic}
        /></Link>
      </div>
      <div className={`w-full flex flex-col items-center justify-center overflow-hidden ${il ? 'px-1' : 'px-4'}`}>
        <Link href={`/${username}`}><p className="cursor-pointer text-sm truncate w-full text-center">{name}</p></Link>
        <Link href={`/${username}`}><p className="cursor-pointer text-xs truncate w-full text-center">@{username}</p></Link>
        <p className='text-xs font-extralight truncate w-full text-center'>{college}</p>
      </div>
      <button className={`clicky my-2 py-1.5 px-4 dark:text-gray-200 rounded-full shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={followUser}>{buttonText}</button>
    </div>
    :
    <div className='flex items-center justify-between border-b dark:border-bdark-200 px-2 py-4 mb-2 text-gray-500 dark:text-gray-400 w-full'>
      <div className='h-9 w-9 rounded-full overflow-hidden'>
        <Link href={`/${username}`}><img
          alt={`${name}'s profile picture`}
          className='object-cover rounded-full cursor-pointer'
          src={pic}
        /></Link>
      </div>
      <div className='ml-3 flex-1 overflow-hidden'>
        <Link href={`/${username}`}><p className="cursor-pointer text-sm truncate">{name}</p></Link>
        <Link href={`/${username}`}><p className="cursor-pointer text-xs truncate">{username}</p></Link>
        <p className='text-xs font-extralight truncate'>{college}</p>
      </div>
      <div className={`ml-1 py-1 px-1.5 dark:text-gray-200 rounded-full shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={followUser}>{buttonText}</div>
    </div>
  )
}

export default ProfileToFollow
