import { AdjustmentsIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/outline"
import { SiteLayout } from "../Layouts/Layouts"
import { useAuth } from '../contexts/AuthContext';
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect, useState } from "react";
import AccountSettings from "../components/AccountSettings";
import PasswordSettings from "../components/PasswordSettings";
import PreferencesSettings from "../components/PreferencesSettings";

function Settings() {
	const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
  const [ active, setActive ] = useState('account')

  useEffect(()=>{
    if(tabActive==='settings')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('settings');
},[])

  return (
    <div className="flex justify-center mb-12 min-h-screen">
      <div className="mt-3 w-screen md:w-10/12 md:flex block justify-center">
        <div className="w-screen md:w-56 px-1 pt-1 md:px-0 md:pt-0 md:py-1 md:pl-1 justify-evenly bg-white dark:bg-bdark-100 rounded-t-lg md:rounded-l-lg h-fit-content shadow-md flex flex-row md:flex-col">
          <div onClick={()=>setActive('account')} className={`flex flex-col md:flex-row items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-100 p-3 space-x-2 ${active==='account'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <UserCircleIcon className="h-6 w-6"/>
            <p className="hidden md:block"> Account</p>
          </div>
          <div onClick={()=>setActive('preferences')} className={`flex flex-col md:flex-row items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-100 p-3 space-x-2 ${active==='preferences'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <AdjustmentsIcon className="h-6 w-6"/>
            <p className="hidden md:block">Preferences</p>
          </div>
          <div onClick={()=>setActive('password')} className={`flex flex-col md:flex-row items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-100 p-3 space-x-2 ${active==='password'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <LockClosedIcon className="h-6 w-6"/>
            <p className="hidden md:block">Password</p>
          </div>
        </div>
        {active === "account" && <AccountSettings/>}
        {active === "preferences" && <PreferencesSettings/>}
        {active === "password" && <PasswordSettings/>}
      </div>
    </div>
  )
}

Settings.getLayout = function getLayout(page) {
  return (
      <SiteLayout>
          {page}
      </SiteLayout>
  )
}

export default Settings
