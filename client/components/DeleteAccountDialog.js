import axios from "axios"
import { useState } from "react"
import { useActiveTab } from "../contexts/ActiveTabContext"
import { useAuth } from "../contexts/AuthContext"

function DeleteAccountDialog() {
  const [deleting, setDeleting] = useState()
  const { prevTab, setTabActive } = useActiveTab()
  const { currentUser, logout } = useAuth()

  async function deleteAccount(){
    setDeleting(true)
    logout()
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`).then(()=>{
      setDeleting(false)
    })
  }
  return (
    <div className="flex flex-col justify-center items-center space-y-8 p-3 w-screen apfl md:apfc md:w-100 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md z-50">
      <p className="text-gray-500 dark:text-gray-400 cursor-default">Are you sure you want to delete your account?</p>
      <div className="flex justify-evenly items-center w-full m-3">
        <div onClick={()=>setTabActive(prevTab)} className="text-gray-500 dark:text-gray-400 cursor-pointer">Cancel</div>
        <div className = "text-red-600 cursor-pointer" onClick = {deleteAccount}>
          {deleting ? <div className="loader mx-auto animate-spin"></div> : <>Yes</>}
        </div>
      </div>
    </div>
  )
}

export default DeleteAccountDialog
