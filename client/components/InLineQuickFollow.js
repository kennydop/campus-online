import axios from "axios";
import { useEffect, useState } from "react";
import ProfileToFollow from "../components/ProfileToFollow"
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link"

function InLineQuickFollow() {
  const { currentUser } = useAuth();
  const [ suggestions, setSuggestions ] = useState()

  useEffect(()=>{
    async function getSuggestions(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}/suggestions`).then((res)=>{
        setSuggestions(res.data)
      })
    }
    getSuggestions()
  },[])

  return (
    (suggestions && suggestions?.length !== 0) ?
    <div className="overflow-hidden w-screen md:w-102 lg:hidden">
      <div className="flex justify-between items-center mx-1.5 mb-1">
        <div className="text-gray-500 dark:text-gray-400 font-semibold">Quik Follow</div>
        <Link href={`/suggestions`}><div className="text-pink-500 text-sm cursor-pointer">See All</div></Link>
      </div>
      <div className="flex hide-scrollbar overflow-x-auto">
      {
        suggestions.slice(0, 9).map(suggestion => (
        <ProfileToFollow page key={suggestion._id} id={suggestion._id} username={suggestion.username} name={suggestion.name} pic={suggestion.profilePicture} college={suggestion.college} il/>
        ))
      }
      </div>
  </div>
    :
    <></>
  )
}

export default InLineQuickFollow
