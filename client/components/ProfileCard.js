/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PencilIcon } from "@heroicons/react/outline";
import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import { defaultCoverPicture } from "../images/defaults"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";
import FollowersAndFollowingsList from "./FollowersAndFollowingsList";
import UpdateCoverPicture from "./UpdateCoverPicture";
import UpdateProfilePicture from "./UpdateProfilePicture";

function ProfileCard({ admin, _user, loggedIn, refreshUser }) {
  const [ user, setUser ] = useState()
  const [ followBtnText, setFollowBtnText ] = useState(_user?.isfollowing ?'Unfollow' : 'Follow')
  const [ showFF, setShowFF ] = useState()
  const [ pPic, setPPic ] = useState()
  const { tabActive, setTabActive } = useActiveTab()
  const { currentUser } = useAuth()
  const { socket } = useSocket()
  
  function followUser(){
    if(!loggedIn){
      router.push('/login?returnUrl=/'+user._id)
      return
    }
    if(followBtnText==="...") return
    setFollowBtnText("...")
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${user._id}/follow`, {userId: currentUser._id}).then((res)=>{
      if(res.data === "user has been followed"){
        setFollowBtnText('Unfollow')
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: user._id,
          type: "follow",
        })
      }else if(res.data === "user has been unfollowed"){
        setFollowBtnText('Follow')
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: user._id,
          type: "unfollow",
        })
      }
      refreshUser()
    })
  }

  useEffect(() => {
    setUser(_user)
  }, [_user])

  useEffect(()=>{
    if(user){
      user.isfollowing ? setFollowBtnText("Unfollow") : setFollowBtnText("Follow")
      console.log("running")
      if(user.profilePicture.startsWith("https://pbs.twimg.com/profile_images")){
        setPPic(user.profilePicture.replace("normal", "400x400"))
      }else if(user.profilePicture.startsWith("https://res.cloudinary.com/kennydop/image/upload/")){
        setPPic(user.profilePicture.replace("w_200", "w_400"))
      }else{
        setPPic(user.profilePicture)
      }
    }
  }, [user])

  return (
    <>
    <div className='md:mx-auto w-full md:w-8/12 bg-white dark:bg-bdark-100 shadow-md rounded-b-lg md:my-6 mb-6 md:rounded-lg overflow-hidden'>
      <div className='relative w-full h-52 md:h-60 overflow-hidden'>
        <img src={ user?.coverPicture ? user.coverPicture : defaultCoverPicture}
        className='w-full h-full object-cover'/>
        {admin && <div onClick={()=>setTabActive('updateCI')} className='absolute right-0 bottom-0 py-1 px-3 bg-gray-500 dark:bg-bdark-200 bg-opacity-70 cursor-pointer'><PencilIcon className='h-4 text-white dark:text-gray-400'/></div>}
      </div>
        <div className='relative w-full dark:bg-bdark-100 flex flex-col pb-2'>
          <div className='flex flex-col'>
            <div className = 'lg:ml-56 mt-8 lg:mt-1 cursor-default flex flex-col items-center lg:items-start'>
              <div ><p className = 'text-gray-500 dark:text-gray-400 text-xl font-medium'>{user?.name}</p></div>
              <div ><p className = 'text-gray-500 dark:text-gray-400 text-xs font-light'>{'@'+ user?.username}</p></div>
              <div ><p className = 'text-gray-500 dark:text-gray-400 text-xs font-light'>{user?.college}</p></div>
            </div>
            <div className='flex space-x-5 mx-auto lg:ml-56'>
              <div onClick={()=>{setShowFF('followers'); setTabActive('fflist')}} className = 'text-center text-gray-500 dark:text-gray-400 font-light cursor-pointer'>{user?.followers ?( user.followers.length === 1 ? "1 Follower" : user.followers.length + " Followers")  : "0 Followers"}</div>
              <div onClick={()=>{setShowFF('followings'); setTabActive('fflist')}} className = 'text-center text-gray-500 dark:text-gray-400 font-light cursor-pointer'>{user?.followings ? user.followings.length : "0"} Followings</div>
            </div>
          </div>
          <div className='absolute -top-20 left-1/2 -ml-14 lg:-top-20 lg:left-32'>
            <div className='relative'>
              <img className = "h-28 w-28 lg:h-36 lg:w-36 object-cover rounded-full border-4 border-white dark:border-bdark-100" 
                src = {pPic}/>
              {admin && <div onClick={()=>setTabActive('updatePP')} className='absolute right-4 bottom-2 py-2 px-2 bg-gray-500 dark:bg-bdark-200 bg-opacity-90 rounded-full cursor-pointer transition hover:scale-105'><PencilIcon className='h-3 text-white dark:text-gray-400'/></div>}
            </div>
          </div>
          {!admin && 
          <div className='lg:absolute right-2 top-2 flex space-x-3 mt-2 lg:mt-0 mx-auto'>
            <button className={`clicky h-8 w-24 rounded-full shadow-md  text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl ${followBtnText==='Follow' ? 'bg-pink-500 text-white dark:text-gray-200' : 'bg-white dark:bg-bdark-200 text-pink-500 border border-pink-500' }`}onClick={followUser}>{followBtnText}</button>
            <button onClick={()=>router.push(`/chats?id=${user._id}`)} className='clicky h-8 w-24 rounded-full shadow-md border border-pink-500 text-pink-500 text-center bg-blue-grey-50 dark:bg-bdark-200 cursor-pointer hover:shadow-lg dark:text-gray-400 dark:shadow-lg dark:hover:shadow-xl'>Message</button>
          </div>}
          <div className='lg:absolute right-2 top-2 fit-content mt-2 lg:mt-0 mx-auto'>
            {(admin && loggedIn) && <div onClick={()=>router.push('/settings')} className='flex py-1.5 px-3 rounded-full shadow-md text-white dark:text-gray-400 text-center bg-gray-500 dark:bg-bdark-200 cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl'>
              <PencilIcon className='h-5 text-white dark:text-gray-400 text-center'/>Edit Profile
            </div>}
          </div>
        </div>
    </div>
    {(showFF && tabActive[tabActive.length - 1] === 'fflist') && <FollowersAndFollowingsList setShowFF={setShowFF} _followers={user.followers} _followings={user.followings} username={user.username} showFF={showFF}/>}
    {tabActive[tabActive.length - 1]==='updatePP' && <UpdateProfilePicture refreshUser={refreshUser}/>}
    {tabActive[tabActive.length - 1]==='updateCI' && <UpdateCoverPicture refreshUser={refreshUser} user={admin && user}/>}
    </>
  )
}
export default ProfileCard
