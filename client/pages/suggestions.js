import axios from "axios"
import { useEffect, useState } from "react"
import ProfileToFollow from "../components/ProfileToFollow";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useAuth } from "../contexts/AuthContext";
import { SiteLayout } from "../Layouts/Layouts";

function Suggestions() {
  const { setTabActive } = useActiveTab()
  const { currentUser } = useAuth();
  const [ suggestions, setSuggestions ] = useState()

  
  useEffect(()=>{
    setTabActive('suggestions');
  },[])

  useEffect(()=>{
    async function getSuggestions(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}/suggestions`).then((res)=>{
        setSuggestions(res.data)
      })
    }
    getSuggestions()
  },[])

  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto w-full md:w-9/12 xl:w-10/12 xl:grid-cols-5 justify-center mt-4">
      {(suggestions && suggestions?.length !== 0) &&
        suggestions?.map(suggestion => (
        <ProfileToFollow page key={suggestion._id} id={suggestion._id} username={suggestion.username} name={suggestion.name} pic={suggestion.profilePicture} college={suggestion.college}/>
        ))
      }
    </div>
    <div className='pt-20'></div>
    </>
  )
}

Suggestions.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      {page}
    </SiteLayout>
  )
}

export default Suggestions
