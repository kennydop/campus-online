import { useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useOnClickOutside } from "./Hooks"

function SearchChat({hits, clearSearch, setCurrentChat}) {
  const ref = useRef()
  useOnClickOutside(ref, ()=>{clearSearch()})
  const { currentUser } = useAuth()

  return (
    (hits?.length !== 0 && hits?.length !== undefined) &&
      <div ref={ref} className="fixed flex flex-col mt-3 bg-white dark:bg-bdark-100 rounded-b-lg shadow-all-md dark:shadow-all-lg z-20 text-gray-500 dark:text-gray-400 max-h-96 overflow-y-auto">
        {hits?.map(hit =>
          hit._id !== currentUser._id &&
          <div onClick={()=>{clearSearch(); setCurrentChat(null, hit._id, {username: hit.username, lastSeen: hit.lastSeen})}} className="flex m-1 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-bdark-50">
            <div className='max-h-9 w-9 rounded-full overflow-hidden'>
              <img
                className='object-cover rounded-full cursor-pointer'
                src={hit.profilePicture}/>
            </div>
            <div className='ml-3'>
              <p className="cursor-pointer text-sm">{hit.name}</p>
              <p className="cursor-pointer text-xs">@{hit.username}</p>
            </div>
          </div>
        )}
    </div>
  )
}

export default SearchChat
