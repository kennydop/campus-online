import { XIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useAuth } from "../contexts/AuthContext";
import ProfileToFollow from "../components/ProfileToFollow"

function FollowersAndFollowingsList({setShowFF, _followers, _followings, username, showFF}) {
  const { tabActive, setTabActive } = useActiveTab()
  const [ loading, setLoading ] = useState(true)
  const { currentUser } = useAuth()
  const [ followers, setFollowers ] = useState([])
  const [ followings, setFollowings ] = useState([])

  useEffect(()=>{
    async function getUserProfile_LoggedIn(id, f){
      if(id === currentUser._id) return
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${id}`, { params:{ currentUser: currentUser._id} }).then((res)=>{
        f === "followers" ? setFollowers((oldVal)=>{ return [...oldVal, res.data]}) : setFollowings((oldVal)=>{ return [...oldVal, res.data]})  
      }).catch((error)=>{
        console.log(error)
      })
    }
    async function getUserProfile_NotLoggedIn(id, f){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${id}`).then((res)=>{
        f === "followers" ? setFollowers((oldVal)=>{ return [...oldVal, res.data]}) : setFollowings((oldVal)=>{ return [...oldVal, res.data]})
      }).catch((error)=>{
        console.log(error)
      })
    }

    if(loading && _followers.length !== 0){
      if(currentUser){
        _followers.forEach((f, i, arr)=>{
          if(i === arr.length-1){
            getUserProfile_LoggedIn(f, "followers")
            setLoading(false)
          }else{
            getUserProfile_LoggedIn(f, "followers")
          }
        })
      }else{
        _followers.forEach((f, i, arr)=>{
          if(i === arr.length-1){
            getUserProfile_NotLoggedIn(f, "followers")
            setLoading(false)
          }else{
            getUserProfile_NotLoggedIn(f, "followers")
          }
        })
      }
    }else{
      setLoading(false)
    }

    if(loading && _followings.length !== 0){
      if(currentUser){
        _followings.forEach((f, i, arr)=>{
          if(i === arr.length-1){
            getUserProfile_LoggedIn(f, "followings")
            setLoading(false)
          }else{
            getUserProfile_LoggedIn(f, "followings")
          }
        })
      }else{
        _followings.forEach((f, i, arr)=>{
          if(i === arr.length-1){
            getUserProfile_NotLoggedIn(f, "followings")
            setLoading(false)
          }else{
            getUserProfile_NotLoggedIn(f, "followings")
          }
        })
      }
    }else{
      setLoading(false)
    }

  },[])

  return (
    <div className="flex flex-col w-screen apfl md:apfc md:w-96 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md overflow-hidden z-50">
      <div className="w-full p-3 border-b dark:border-bdark-200 text-gray-500 dark:text-gray-400 flex justify-between">
        <p className="font-semibold w-11/12 truncate">{username}</p>
        <div id="close_post" onClick={()=>{setShowFF(''); setTabActive(tabActive[tabActive.length-2]==='notification' ? tabActive[tabActive.length-3] : "go back")}}>
          <XIcon className="h-6 w-6 cursor-pointer"/>
        </div>
      </div>
      <div className="flex justify-around border-b border-gray-200 dark:border-bdark-200 mt-3 text-gray-500 dark:text-gray-400">
        <div onClick={()=>{setShowFF('followers')}} className={`cursor-pointer ${showFF === "followers" && "border-b-2 border-pink-500"}`}>{`Followers (${_followers.length})`}</div>
        <div onClick={()=>{setShowFF('followings')}} className={`cursor-pointer ${showFF === "followings" && "border-b-2 border-pink-500"}`}>{`Followings (${_followings.length})`}</div>
      </div>
      {
        loading ?
        <div className="loader animate-spin mx-auto my-6 z-50"/>
        :
        <div className={`flex overflow-x-hidden`}>
          <div className={`w-screen md:w-96 flex-shrink-0 overflow-y-auto transition duration-150 ease-linear ${showFF === "followers" ? "-translate-x-0" : "-translate-x-full"}`}>
            {
              followers.length !== 0 ?
              <>
                {followers.map((f)=><ProfileToFollow key={f._id} name={f.name} username={f.username} pic={f.profilePicture} college={f.college} id={f._id} isfollowing={f?.isfollowing}/>)}
              </>
              :
              !loading && <div className="my-6 text-center text-gray-500 dark:text-gray-400">
                No followers yet
              </div>
            }
          </div>
          <div className={`w-screen md:w-96 flex-shrink-0 overflow-y-auto transition duration-150 ease-linear ${showFF === "followings" ? "-translate-x-full" : "translate-x-0"}`}>
            {
              followings.length !== 0 ?
              <>
                {followings.map((f)=><ProfileToFollow key={f._id} name={f.name} username={f.username} pic={f.profilePicture} college={f.college} id={f._id} isfollowing={f?.isfollowing}/>)}
              </>
              :
              !loading && <div className="my-6 text-center text-gray-500 dark:text-gray-400">
                No followings yet
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default FollowersAndFollowingsList
