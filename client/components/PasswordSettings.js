import axios from "axios"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

function PasswordSettings() {
  const [updateLoading, setUpdateLoading] = useState()
  const [error, setError] = useState()
  const { currentUser } = useAuth()

  async function changePassword(e){
    e.preventDefault();
    setError('');
    setUpdateLoading(true)
    const {oldpassword, newpassword} = e.target.elements
    const update = {oldpassword: oldpassword.value, newpassword: newpassword.value}
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/resetpassword/${currentUser._id}`, update, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
      if(res.data.name === "IncorrectPasswordError"){
        setError("Incorrect Old Password")
      }
      setUpdateLoading(false)
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="w-full h-105 bg-white dark:bg-bdark-100 rounded-b-lg md:rounded-r-lg md:rounded-bl-lg flex flex-col justify-center p-3 shadow-md">
      <div className="flex items-center justify-center my-4">
        <form className="flex mx-auto flex-col space-y-5 p-3 wsc md:w-fit-content" autoComplete='on' onSubmit={changePassword}>
        <div className="flex items-center justify-center">
            {error && <p className = "text-red-500 text-sm text-center" id = "injectError">{error}</p>}
        </div>
        <label>
          <p className="ml-2 text-gray-500 dark:text-gray-400">Current Password</p>
          <input
            id="oldpassword"
            minLength="6"
            required={true}
            type="password"
            autoComplete="current-password"
            className="infofield-edit"
            title="password"
          />
          </label>
        <label>
          <p className="ml-2 text-gray-500 dark:text-gray-400">New Password</p>
          <input
            id="newpassword"
            minLength="6"
            required={true}
            type="password"
            autoComplete="new-password"
            className="infofield-edit"
            title="password"
          />
          </label>
          <div className="flex mt-3">
            <button type="submit" disabled={updateLoading} className="infobutton-edit mx-auto">
              {updateLoading ? <div className="loader mx-auto animate-spin"></div> : <>Confirm</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordSettings
