import { EyeIcon } from "@heroicons/react/solid"
import { useState, forwardRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import TimePast from "./TimePast"

const Message = forwardRef(({from, msg, sent, read}, ref) => {
  const [seeAdditionalInfo, setSeeAdditionalInfo] = useState()
  const { currentUser } = useAuth()
  
  return (
    from===currentUser._id?
      <div ref={ref} className='self-end fit-content flex flex-col cursor-default'>
        <div onClick={()=>setSeeAdditionalInfo(!seeAdditionalInfo)} className='text-white fit-content rounded-2xl shadow-md bg-pink-500 px-3 py-1 my-0.5 max-w-xs relative whitespace-pre-wrap break-words text-left'>{msg}</div>
        <div className={`flex self-end justify-center items-center text-2xs font-semibold text-gray-500 dark:text-gray-400 ${seeAdditionalInfo?'block':'hidden'}`}>
          <TimePast date={new Date(sent)} msg _sent/> | <EyeIcon className={`h-3 ml-1 ${read &&'text-pink-500'}`}/>
        </div>
      </div>
      :
      <div ref={ref} className='self-start fit-content flex flex-col cursor-default'>
        <div onClick={()=>setSeeAdditionalInfo(!seeAdditionalInfo)} className='text-gray-500 dark:text-gray-400 fit-content rounded-2xl shadow-md bg-white dark:bg-bdark-100 px-3 py-1 my-0.5 max-w-xs relative whitespace-pre-wrap break-words text-left'>{msg}</div>
        <div className={`flex self-start justify-center items-center text-2xs font-semibold text-gray-500 dark:text-gray-400 ${seeAdditionalInfo?'block':'hidden'}`}>
        <TimePast date={new Date(sent)} msg/>
        </div>
      </div>
  )
})

export default Message
