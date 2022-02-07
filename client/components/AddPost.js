/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ChartBarIcon, TagIcon, PhotographIcon} from "@heroicons/react/outline"
import { useAuth } from "../contexts/AuthContext";
import { useActiveTab } from "../contexts/ActiveTabContext";
import Link from "next/link"

function AddPost() {
  const { currentUser } = useAuth();
  const { setTabActive } = useActiveTab()
    
  return (
    <div className='hidden md:block md:p-1.5 md:w-102'>
      <div className='p-2 rounded-lg shadow-md text-gray-500 font-medium bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
        <div className='flex space-x-4 items-center mb-3 ml-2'>
          <Link href={`/u/${currentUser.username}`} passHref><img className='cursor-pointer rounded-full object-cover h-11 w-11' src={currentUser.profilePicture}/></Link>
            <div className='flex flex-1 text-gray-400 dark:text-gray-500 h-10 p-2 cursor-text bg-blue-grey-50 dark:bg-bdark-200 rounded-full truncate' onClick={()=>setTabActive("post")}>
              What&apos;s up, {currentUser.username}?
            </div>
        </div>
        <div className='flex justify-evenly pt-2 border-t dark:border-bdark-200'>
          <div onClick={()=>setTabActive("post media")} className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
            <PhotographIcon className='text-blue-500 h-6'/>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Media</p>
          </div>
          <div onClick={()=>setTabActive("post product")} className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
            <TagIcon className='text-red-500 h-6'/>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Sell</p>
          </div>
          <div onClick={()=>setTabActive("post poll")} className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
            <ChartBarIcon className='text-green-500 h-6'/>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Poll</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPost
