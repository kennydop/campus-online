/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import TimePast from "./TimePast"
import Link from "next/link"
import { DotsVerticalIcon } from "@heroicons/react/outline"
import { useState, useRef } from "react"
import {useOnClickOutside} from "./Hooks"

function Comment({ comment, admin, delCom}) {
  const [del, setDel] = useState()
  const ref = useRef();

  useOnClickOutside(ref, () =>setDel(false))

  return (
    <div className='relative flex flex-col items-start my-2 mx-2'>
      <div className='flex items-center w-full justify-between'>
        <div className='flex items-center'>
          <Link href={`/${comment.authorUsername}`}><img src={comment.authorImg} className='h-6 w-6 rounded-full object-cover mr-2 cursor-pointer'/></Link>
          <div>
            <div className='flex justify-center items-center space-x-2 truncate'>
              <Link href={`/${comment.authorUsername}`}><p className='text-sm text-gray-600 font-light dark:text-gray-400 truncate cursor-pointer'>{comment.authorName}</p></Link>
              <Link href={`/${comment.authorUsername}`}><p className='text-gray-600 dark:text-gray-400 text-xs font-thin truncate cursor-pointer'>@{comment.authorUsername}</p></Link>
            </div>
            <TimePast date={new Date(comment.createdAt)}/>
          </div>
        </div>
        {admin && <div className="mx-3" onClick={()=>setDel(true)}><DotsVerticalIcon className="h-4 text-gray-500 dark:text-gray-400 cursor-pointer"/></div>}
      </div>
      {admin && <div ref={ref} onClick={()=>{setDel(false); delCom(comment._id)}} className={`absolute top-0 right-3.5 bg-white dark:bg-bdark-50 ${del ? "shadow-all dark:shadow-xl text-red-500 hover:bg-gray-100 dark:hover:bg-bdark-100 rounded-lg px-4 py-1 cursor-pointer" : "hidden"}`}>Delete</div>}
      <div  className='text-gray-600 dark:text-gray-400 self-start whitespace-pre-wrap cursor-default text-sm font-light'>{comment.comment}</div>
    </div>
  )
}

export default Comment
