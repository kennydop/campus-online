import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import ProfileToFollow from "./ProfileToFollow"
import QuickFollowPlaceholder from "./QuickFollowPlaceholder"

function PeopleYouMightKnow() {
  const {currentUser} = useAuth()
  const [suggestions, setSuggestions] = useState()
  useEffect(()=>{
    if(currentUser){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}/suggestions`).then((res)=>{
        setSuggestions((res.data).slice(0, 4))
      })
    }else{
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/suggestions/nl`).then((res)=>{
        setSuggestions(res.data)
      })
    }
  },[])

  return (
    <div className='hidden lg:block h-full sticky top-20 my-2 ml-6 mt-3 p-2 w-tt rounded-lg shadow-md bg-white dark:bg-bdark-100'>
      <div className='p-2 text-gray-500 dark:text-gray-400 text-center font-bold cursor-default border-b dark:border-bdark-200'>
        <p>Quick follow</p>
      </div>
      { suggestions?
        suggestions.map((suggestion)=> <ProfileToFollow key={suggestion._id} id={suggestion._id} userId={currentUser._id} username={suggestion.username} name={suggestion.name} pic={suggestion.profilePicture} college={suggestion.college}/>)
        :
        <QuickFollowPlaceholder/>
      }
      
      <div className='text-center text-pink-500  cursor-pointer hover:font-bold fit-content mx-auto'>
          <p>More</p>
      </div>
    </div>
  )
}

export default PeopleYouMightKnow
