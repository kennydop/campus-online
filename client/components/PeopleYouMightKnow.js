import ProfileToFollow from "./ProfileToFollow"
import QuickFollowPlaceholder from "./QuickFollowPlaceholder"
import { useRouter } from "next/router"
import { useUtils } from "../contexts/UtilsContext"

function PeopleYouMightKnow() {
  const { suggestions } = useUtils()
  const router = useRouter()

  
  return (
    <div className='hidden lg:block h-full sticky top-20 my-2 ml-6 mt-3 p-2 w-tt rounded-lg shadow-md bg-white dark:bg-bdark-100'>
      <div className='p-2 text-gray-500 dark:text-gray-400 text-center font-bold cursor-default border-b dark:border-bdark-200'>
        <p>Quick follow</p>
      </div>
      { suggestions?
        suggestions.slice(0, 4).map((suggestion)=> <ProfileToFollow key={suggestion._id} id={suggestion._id} username={suggestion.username} name={suggestion.name} pic={suggestion.profilePicture} college={suggestion.college} isfollowing={suggestion.isfollowing}/>)
        :
        <QuickFollowPlaceholder/>
      }
      
      {(suggestions && suggestions?.length > 4) && <div onClick={()=> router.push('/suggestions')} className='text-center text-pink-500  cursor-pointer hover:font-bold fit-content mx-auto'>
        <p>More</p>
      </div>}
    </div>
  )
}

export default PeopleYouMightKnow
