/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import TimePast from "./TimePast"
import Link from "next/link"
import { DotsVerticalIcon } from "@heroicons/react/outline"
import { useState, useRef, useEffect } from "react"
import {useOnClickOutside} from "./Hooks"
import axios from "axios"

function Comment ({ comment, admin, delCom}){
  const [del, setDel] = useState()
  const [author, setAuthor] = useState()
  const mref = useRef();

  useEffect(()=>{
    async function getAuthor(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+comment.authorId).then((res)=>{
        setAuthor(res.data)
      })
    }
    !author && getAuthor()
  },[])

  useOnClickOutside(mref, () =>setDel(false))

  return (
    <div className='flex items-start my-2.5 w-full relative'>
      <div className='h-7 w-7 md:h-9 md:w-9 rounded-full flex-shrink-0 mr-1 md:mr-2'>
        <Link href={`/u/${author?.username}`} passHref><img src={author?.profilePicture} className='h-7 w-7 md:h-9 md:w-9 rounded-full object-cover cursor-pointer'/></Link>
      </div>
      <div className='wpps md:wppm'>
        <div className="relative py-1 px-2 rounded-lg bg-blue-grey-50 dark:bg-bdark-200">
          <div className="flex justify-between items-center">
            <span className='space-x-2 truncate'>
              <Link href={`/u/${author?.username}`} passHref><span className='text-sm text-gray-600 font-semibold dark:text-gray-400 truncate cursor-pointer'>{author?.name}</span></Link>
              <Link href={`/u/${author?.username}`} passHref><span className='text-gray-600 dark:text-gray-400 text-sm truncate cursor-pointer'>@{author?.username}</span></Link>
            </span>
            {admin && <div onClick={()=>setDel(true)}><DotsVerticalIcon className="h-4 ml-2 text-gray-500 dark:text-gray-400 cursor-pointer"/></div>}
          </div>
          <div className='text-gray-600 dark:text-gray-400 self-start whitespace-pre-wrap cursor-default text-sm'>{comment.comment}</div>
          {admin && <div ref={mref} onClick={()=>{setDel(false); delCom(comment._id)}} className={`absolute top-1.5 right-3.5 bg-white dark:bg-bdark-100 ${del ? "shadow-all dark:shadow-xl text-red-500 hover:bg-gray-100 dark:hover:bg-bdark-100 rounded-lg px-4 py-1 cursor-pointer" : "hidden"}`}>Delete</div>}
        </div>
        <TimePast date={new Date(comment.createdAt)}/>
      </div>
    </div>
  )
}

export default Comment
