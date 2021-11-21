/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import { useState } from 'react'

function ProfileToFollow({name, pic, college, id, userId}) {
  const [buttonText, setButtonText] = useState('Follow')

  function followUser(){
    axios.put(`http://localhost:5000/api/users/${id}/follow`, {userId}).then((res)=>{
      if(res.data = "user has been followed"){
        setButtonText('Following')
      }else if(res.data = "user has been unfollowed"){
        setButtonText('Follow')
      }
    })
  }

  return (
    <div className='flex items-center bg-white dark:bg-bdark-100 rounded-lg shadow-md px-2 py-4 mb-2 text-gray-500 dark:text-gray-400 cursor-default w-full'>
      <div className='max-h-9 w-9 rounded-full overflow-hidden'>
        <img 
            className='object-cover rounded-full'
            src={pic}
            layout=''
        />
      </div>
      <div className='ml-3'>
        <p>{name}</p>
        <p className='text-xs font-light w-11/12 truncate'>{college}</p>
      </div>
      <div className={`py-1 px-1.5 absolute right-6 mb-5 dark:text-gray-200 rounded-full shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={()=>{followUser}}>{buttonText}</div>
    </div>
  )
}

export default ProfileToFollow
