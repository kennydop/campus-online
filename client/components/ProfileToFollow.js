/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import { useState } from 'react'
import Link from "next/link"

function ProfileToFollow({name, username ,pic, college, id, userId}) {
  const [buttonText, setButtonText] = useState('Follow')
  var sn = ''
  var sun = ''
  if(college.length > 24){
    college = college.substring(0, 24) + '...';
  }
  if(username.length > 20){
    sun = username.substring(0, 20) + '...';
  }else{
    sun = username
  }
  if(name.length > 15){
    sn = name.substring(0, 15) + '...';
  }else{
    sn = name
  }

  function followUser(){
    setButtonText("................")
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${id}/follow`, {userId}).then((res)=>{
    if(res.data === "user has been followed"){
        setButtonText('Unfollow')
      }else if(res.data === "user has been unfollowed"){
        setButtonText('Follow')
      }
    })
  }

  return (
    <div className='flex items-center border-b dark:border-bdark-200 px-2 py-4 mb-2 text-gray-500 dark:text-gray-400 w-full'>
      <div className='max-h-9 w-9 rounded-full overflow-hidden'>
        <Link href={`/${username}`}><img
          className='object-cover rounded-full cursor-pointer'
          src={pic}
        /></Link>
      </div>
      <div className='ml-3'>
        <Link href={`/${username}`}><p className="cursor-pointer text-sm">{sn}</p></Link>
        <Link href={`/${username}`}><p className="cursor-pointer text-xs">@{sun}</p></Link>
        <p className='text-xs font-extralight'>{college}</p>
      </div>
      <div className={`py-1 px-1.5 absolute right-6 dark:text-gray-200 rounded-full shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={followUser}>{buttonText}</div>
    </div>
  )
}

export default ProfileToFollow
