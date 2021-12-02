import { PencilIcon } from "@heroicons/react/outline"
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext"

function AccountSettings() {
  const { currentUser, setCurrentUser } = useAuth()
  const [error, setError] = useState();
  const username = useRef();
	const name = useRef();
	const email = useRef();
	const [updateLoading, setUpdateLoading] = useState(false);

  // useEffect(()=>{
  //   var textarea = document.getElementById("_p");
  //   textarea.oninput = function() {
  //     textarea.style.height = ""; /* Reset the height*/
  //     textarea.style.height = textarea.scrollHeight + "px";
  //   }
  // })

  async function updateProfile(e){
    e.preventDefault();
    setError('');
    setUpdateLoading(true)
    // axios.put(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+currentUser._id, {}, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
    //   if(res.data.message){
    //     setError(res.data.message)
    //     setUpdateLoading(false)
    //   }else{
    //     setCurrentUser(res.data)
    //     setUpdateLoading(false)
    //   }
    // })
  }

  return (
    <div className="w-full bg-white dark:bg-bdark-100 rounded-b-lg md:rounded-r-lg md:rounded-bl-lg flex flex-col justify-center p-3 shadow-md">
      <div className="block md:hidden text-gray-500 dark:text-gray-400 text-lg font-semibold mb-6 mx-auto">Account</div>
      <div className='relative my-3 fit-content mx-auto'>
        <img className = "h-28 w-28 lg:h-36 lg:w-36 object-cover rounded-full border-2 border-gray-400 dark:border-bdark-50 cursor-default" 
          src = {currentUser.profilePicture.startsWith("https://pbs.twimg.com/profile_images") ? currentUser.profilePicture.replace("normal", "400x400") : (currentUser.profilePicture.startsWith("https://res.cloudinary.com/kennydop/image/upload/") ? currentUser.profilePicture.replace("w_100", "w_400") : currentUser.profilePicture)}/>
        <div className='absolute right-4 bottom-2 py-2 px-2 bg-gray-500 dark:bg-bdark-200 bg-opacity-90 rounded-full cursor-pointer transition hover:scale-105'>
          <PencilIcon className='h-3 text-white dark:text-gray-400'/>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <form className="flex flex-col space-y-5 m-2 wsc md:w-fit-content" autoComplete='on' onSubmit={updateProfile}>
          <div className="flex items-center justify-center">
            {error && <p className = "text-red-500 text-sm text-center" id = "injectError">{error}</p>}
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1">
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Name</p>
              <input
              ref={name}
              minLength="3"
              type="text"
              autoComplete="name"
              title="name"
              defaultValue={currentUser.name}
              className="infofield-edit"
              />
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Username</p>
              <input
              ref={username}
              minLength="3"
              type="text"
              pattern="^[A-Za-z0-9_]{3,15}$"
              autoComplete="new name"
              title="use only letters, numbers and underscores"
              defaultValue={currentUser.username}
              className="infofield-edit"
              />
            </label>
            <label className="flex flex-col xl:col-span-2 m-3">
            <p className="ml-2 text-gray-500 dark:text-gray-400">Email</p>
              <input
              ref={email}
              minLength="3"
              type="text"
              autoComplete="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              title="example@example.com"
              defaultValue={currentUser.email}
              className="infofield-edit-long"
              />
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Birthday</p>
              <input
              type="date"
              autoComplete="date"
              title="bithday"
              defaultValue={currentUser.bithday}
              className="infofield-edit"
              />
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Gender</p>
              <select autoComplete="gender" defaultValue={currentUser.username} className="infofield-edit">
                <option>Male</option>
                <option>Female</option>
              </select>
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">College</p>
              <select id = 'colleges' defaultValue={currentUser.college} className = "infofield-edit">
                <option>Select College</option>
              </select>
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Level</p>
              <select autoComplete="gender" defaultValue={currentUser.username} className="infofield-edit">
                <option>Freshman</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
              </select>
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">Relationship</p>
              <select id = 'colleges' defaultValue={currentUser.college} className = "infofield-edit">
                <option>Single</option>
                <option>In A Relationship</option>
                <option>Married</option>
              </select>
            </label>
            <label className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400">TBD</p>
              <select autoComplete="gender" defaultValue={currentUser.username} className="infofield-edit">
                <option>TBD</option>
                <option>TBD</option>
              </select>
            </label>
          </div>
          <label className="flex flex-col m-3">
            <p className="ml-2 text-gray-500 dark:text-gray-400">Bio</p>
            <textarea className="h-40 p-3 rounded-lg outline-none no-ta-resize bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 ring-pink-500"/>
          </label>
          <div className="flex justify-between items-center m-3">
            <div className="text-red-500 cursor-pointer">Delete Account</div>
            <button disabled={updateLoading} className="infobutton-edit">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountSettings
