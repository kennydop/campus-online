/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUtils } from "../contexts/UtilsContext";
import { useOnClickOutside } from "./Hooks";

function SearchContainer({hits, clearSearch}) {
  const ref = useRef()
  const {trending} = useUtils()
  const { currentUser } = useAuth()

  useOnClickOutside(ref, ()=>{clearSearch()})
  
  return (
    <div ref={ref} className="flex flex-col w-screen x-centered md:w-100 bg-white dark:bg-bdark-100 rounded-b-lg shadow-all-md dark:shadow-all-lg z-20 text-gray-500 dark:text-gray-400 max-h-96 overflow-y-auto">
      {hits?.length !== 0 ?
        hits?.map(hit => 
          hit._id !== currentUser?._id &&
          <Link key={hit._id} href={`/${hit.username}`} passHref>
          <div onClick={()=>clearSearch()} className="flex m-1 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-bdark-50">
            <div className='max-h-9 w-9 rounded-full overflow-hidden'>
              <img
                alt='profile picture'
                className='object-cover rounded-full cursor-pointer'
                src={hit.profilePicture}/>
            </div>
            <div className='ml-3'>
              <p className="cursor-pointer text-sm">{hit.name}</p>
              <p className="cursor-pointer text-xs">@{hit.username}</p>
            </div>
          </div>
          </Link>
          )
          :
          <div className="block md:hidden">
            <div className="m-1 p-1 font-semibold cursor-default border-b border-gray-200 dark:border-bdark-200">
              Trending
            </div>
          {trending?.map(t=>
          <Link key={t.word} href={`/trending?word=${t.word}`} passHref>
            <div onClick={()=>clearSearch()} className="m-1 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-bdark-50">
              {t.word}
            </div>
          </Link>
          )}
          </div>
      }
    </div>
  )
}

export default SearchContainer
