/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { forwardRef, useEffect, useState } from 'react';
import TimePast from './TimePast';

const Chat = forwardRef(({sender, message, unread}, ref) => {
  const [user, setUser] = useState()

  useEffect(()=>{
    async function getUser(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+sender).then((res)=>{
        setUser(res.data)
      })
    }
    getUser()
  },[sender])

	return(
		<div ref={ref} className='relative flex items-center h-20 w-full border-b border-gray-300 dark:border-bdark-200 dark:hover:bg-bdark-50 hover:bg-blue-grey cursor-pointer'>
			<div className='pl-2 mr-5'>
				<img className='h-12 w-12 object-cover rounded-full text-center' src={user?.profilePicture}/>
			</div>
			<div className='flex flex-col'>
				<p className={`self-start truncate w-44 ${(message.from === user?._id && message.read===false) ?'text-pink-500 font-semibold':'text-gray-500 dark:text-gray-400 font-medium'}`}>{message.message}</p>
				<p className={`self-start text-xs font-light truncate w-44 ${(message.from === user?._id && message.read === false) ?'text-pink-500':'text-gray-500 dark:text-gray-400'}`}>{user?.username}</p>
			</div>
			<TimePast date={new Date(message.createdAt)} read={(message.from === user?._id ? message.read : true)}/>
			{unread.length !== 0 && <div className = 'absolute right-3 bg-pink-500 w-5 h-5 text-center rounded-full'><p className='text-sm text-white dark:text-gray-200'>{unread.length}</p></div>}
		</div>
	)
})
export default Chat