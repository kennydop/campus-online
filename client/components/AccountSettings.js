import { PencilIcon } from "@heroicons/react/outline"
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useAuth } from "../contexts/AuthContext"

function AccountSettings({colleges}) {
  const { currentUser, setCurrentUser } = useAuth()
  const [ user, setUser ] = useState()
  const [ _user, _setUser ] = useState()
  const [error, setError] = useState();
	const [updateLoading, setUpdateLoading] = useState(false);
  const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
  
  const getOrdinalNum = (n) => n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '')

  useEffect(() => {
    colleges.forEach(col => {
      var collegeOption = document.createElement("option");
      collegeOption.innerHTML = col.name;
      document.getElementById('college').appendChild(collegeOption)
    });
  }, [])

  useEffect(() => {
    async function getUser(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+currentUser._id).then((res)=>{
        setUser(res.data)
        _setUser(res.data)
      })
    }
    getUser()
  }, [tabActive])

  function openPPDialog(){
    if(tabActive==='updatePP')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('updatePP'); 
  }

  function openAccDelDialog(){
    if(tabActive==='delAcc')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('delAcc'); 
  }

  function handleValueChange(e){
    if(e.target.value === ""){
      if(e.target.id === "relationship"){
        _setUser(oldval=>{const {relationship,...other } = oldval;  return other})
      }else if(e.target.id === "level"){
        _setUser(oldval=>{const {level,...other } = oldval;  return other})
      }else if(e.target.id === "gender"){
        _setUser(oldval=>{const {gender,...other } = oldval;  return other})
      }else if(e.target.id === "college"){
        _setUser(oldval=>{const {college,...other } = oldval;  return other})
      }
    }else{
      if(e.target.id === "relationship"){
        _setUser(oldval=>{const {relationship,...other } = oldval;  return {relationship: e.target.value,...other }})
      }else if(e.target.id === "level"){
        _setUser(oldval=>{const {level,...other } = oldval;  return {level: e.target.value,...other }})
      }else if(e.target.id === "gender"){
        _setUser(oldval=>{const {gender,...other } = oldval;  return {gender: e.target.value,...other }})
      }else if(e.target.id === "college"){
        _setUser(oldval=>{const {college,...other } = oldval;  return {college: e.target.value,...other }})
      }
    }
  }

  async function updateProfile(e){
    e.preventDefault();
    setError('');
    setUpdateLoading(true)
    const {name, username, email, birthday, gender, college, level, relationship, bio  } = e.target.elements
    const update = {name: name.value !== user.name && name.value, username: username.value !== user.username && username.value, email: email.value !== user.email && email.value, birthday: birthday.value !== user.birthday && birthday.value, gender: gender.value !== user.gender && gender.value, college: college.value !== user.college && college.value, level: level.value !== user.level && level.value, relationship: relationship.value !== user.relationship && relationship.value, description: bio.value !== user.description && bio.value }
    Object.entries(update).forEach(
      ([key, value]) => {
        if(value === false || value.trim() === ""){
          delete update[key]
        }
      }
    );
    if(Object.keys(update).length === 0){
      setUpdateLoading(false)
      return
    }
    if(update.description){
      var str = update.description.trim()
      var wordCount = str.match(/(\w+)/g).length;
      if(wordCount>60){
        setError("Bio Too Long")
        setUpdateLoading(false)
        return
      }
    }
    if(update.birthday){
      if(update.birthday.split('-')[0] > '2010'){
        setError("You seem too young")
        setUpdateLoading(false)
        return
      }else{
        update.birthday = new Date((update.birthday + "T00:00:00")).toDateString().replace(update.birthday.split('-')[2], getOrdinalNum((update.birthday.split('-')[1]).replace('0', '')))
      }
    }
    axios.put(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+currentUser._id, update, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
      if(res.data.message){
        setError(res.data.message)
        setUpdateLoading(false)
      }else{
        setCurrentUser((oldValues) => {return {token: oldValues.token, ...res.data}})
        setUpdateLoading(false)
      }
    })
  }

  return (
    <div className="w-full bg-white dark:bg-bdark-100 rounded-b-lg md:rounded-r-lg md:rounded-bl-lg flex flex-col justify-center p-3 shadow-md">
      <div className='relative my-3 fit-content mx-auto'>
        <img className = "h-28 w-28 lg:h-36 lg:w-36 object-cover rounded-full border-2 border-gray-400 dark:border-bdark-50 cursor-default" 
          src = {currentUser.profilePicture.startsWith("https://pbs.twimg.com/profile_images") ? currentUser.profilePicture.replace("normal", "400x400") : (currentUser.profilePicture.startsWith("https://res.cloudinary.com/kennydop/image/upload/") ? currentUser.profilePicture.replace("w_100", "w_400") : currentUser.profilePicture)}/>
        <div onClick={openPPDialog} className='absolute right-4 bottom-2 py-2 px-2 bg-gray-500 dark:bg-bdark-200 bg-opacity-90 rounded-full cursor-pointer transition hover:scale-105'>
          <PencilIcon className='h-3 text-white dark:text-gray-400'/>
        </div>
      </div>
      <div className="flex items-center justify-center my-4">
        <form className="flex flex-col space-y-5 m-2 wsc md:w-fit-content" autoComplete='on' onSubmit={updateProfile}>
          <div className="flex items-center justify-center">
            {error && <p className = "text-red-500 text-sm text-center" id = "injectError">{error}</p>}
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1">
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Name</p>
              <input
              id="name"
              minLength="3"
              type="text"
              autoComplete="name"
              title="name"
              defaultValue={user?.name}
              className="infofield-edit"
              />
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Username</p>
              <input
              id="username"
              minLength="3"
              type="text"
              pattern="^[A-Za-z0-9_]{3,15}$"
              autoComplete="new name"
              title="use only letters, numbers and underscores"
              defaultValue={user?.username}
              className="infofield-edit"
              />
            </div>
            <div className="flex flex-col xl:col-span-2 m-3">
            <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Email</p>
              <input
              id="email"
              minLength="3"
              type="text"
              autoComplete="email"
              pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
              title="example@example.com"
              defaultValue={user?.email}
              className="infofield-edit-long"
              />
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Birthday</p>
              <input
              id="birthday"
              type="date"
              autoComplete="date"
              title="bithday"
              defaultValue={user?.birthday}
              className="infofield-edit"
              />
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Gender</p>
              <select id="gender" autoComplete="gender" value={_user?.gender} onChange={handleValueChange} className="infofield-edit">
                <option> </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">College</p>
              <select id = 'college' value={_user?.college} onChange={handleValueChange} className = "infofield-edit">
              </select>
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Level</p>
              <select id="level" autoComplete="grade" value={_user?.level} onChange={handleValueChange} className="infofield-edit">
                <option> </option>
                <option>Level 100</option>
                <option>Level 200</option>
                <option>Level 300</option>
                <option>Level 400</option>
              </select>
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Relationship</p>
              <select id = 'relationship' value={_user?.relationship} onChange={handleValueChange} className = "infofield-edit">
                <option> </option>
                <option>Single</option>
                <option>In A Relationship</option>
                <option>Married</option>
              </select>
            </div>
            <div className="flex flex-col m-3">
              <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Programme of Study</p>
              <select className="infofield-edit">
                <option> </option>
                <option>TBD</option>
                <option>TBD</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col m-3">
            <p className="ml-2 text-gray-500 dark:text-gray-400 cursor-default">Bio</p>
            <textarea id="bio" defaultValue={user?.description} className="h-40 p-3 rounded-lg outline-none no-ta-resize bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 ring-pink-500"/>
          </div>
          <div className="flex justify-between items-center m-3">
            <div onClick={openAccDelDialog} className="text-red-600 cursor-pointer">Delete Account</div>
            <button disabled={updateLoading || JSON.stringify(user) === JSON.stringify(_user)} className="infobutton-edit" type="submit">
              {updateLoading ? <div className="loader mx-auto animate-spin"></div> : <>Confirm</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AccountSettings
