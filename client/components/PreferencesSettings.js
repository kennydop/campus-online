import { useTheme } from 'next-themes'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

function PreferencesSettings() {
  const {theme, resolvedTheme, setTheme} = useTheme()
  const { currentUser, setCurrentUser } = useAuth()

  async function changeTheme(pref){
    setTheme(pref)
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`, { preferences: {theme: pref} }, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
      setCurrentUser((oldValues) => {return {token: oldValues.token, ...res.data}})
    })
  }

  return (
    <div className="w-full h-105 bg-white dark:bg-bdark-100 rounded-b-lg md:rounded-r-lg md:rounded-bl-lg flex flex-col justify-center p-3 shadow-md">
      <div className="flex items-center justify-center my-4">
      <div className="flex flex-col mx-auto space-y-8 p-4 wsc md:w-fit-content">
        <div className="flex items-center text-gray-500 dark:text-gray-400 space-x-3">
          <p>Language</p>
          <select className="infofield-edit">
            <option>English</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-gray-500 dark:text-gray-400 cursor-default">
            Dark Mode
          </div>
          <label htmlFor="toggleB" className="flex items-center cursor-pointer">
            <div className="relative cursor-pointer">
              <input type="checkbox" id="toggleB" className="sr-only" checked={theme === 'dark'? true : false} onChange={()=>changeTheme(theme === 'dark' ? 'light' : 'dark')}/>
              <div className="block bg-gray-500 dark:bg-bdark-200 w-12 h-7 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-400 w-5 h-5 rounded-full transition"></div>
            </div>
          </label>
        </div>
      </div>
    </div>
    </div>
      
  )
}

export default PreferencesSettings
