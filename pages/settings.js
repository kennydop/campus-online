import { AdjustmentsIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/outline"
import { SiteLayout } from "../Layouts/Layouts"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect, useState } from "react";
import AccountSettings from "../components/AccountSettings";
import PasswordSettings from "../components/PasswordSettings";
import PreferencesSettings from "../components/PreferencesSettings";
import axios from "axios";

function Settings({colleges}) {
	const { setTabActive } = useActiveTab()
  const [ active, setActive ] = useState('account')

  useEffect(()=>{
    setTabActive('settings');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="flex justify-center mb-12 min-h-screen">
      <div className="mt-3 w-screen md:w-10/12 md:flex block justify-center">
        <div className="w-screen md:w-56 px-1 pt-1 md:px-0  md:py-1 md:pl-1 justify-evenly bg-white dark:bg-bdark-100 sncs md:sncm h-fit-content shadow-md flex flex-row md:flex-col">
          <div onClick={()=>setActive('account')} className={`flex flex-col md:flex-row items-center justify-center md:justify-start cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-3 space-x-2 ${active==='account'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <UserCircleIcon className="h-6 w-6"/>
            <p className="text-sm sm:text-base"> Account</p>
          </div>
          <div onClick={()=>setActive('preferences')} className={`flex flex-col md:flex-row items-center justify-center md:justify-start cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-3 md:space-x-2 ${active==='preferences'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <AdjustmentsIcon className="h-6 w-6"/>
            <p className="text-sm sm:text-base">Preferences</p>
          </div>
          <div onClick={()=>setActive('password')} className={`flex flex-col md:flex-row items-center justify-center md:justify-start cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-3 md:space-x-2 ${active==='password'?'border-b-2 md:border-r-2 md:border-b-0 border-pink-500':''}`}>
            <LockClosedIcon className="h-6 w-6"/>
            <p className="text-sm sm:text-base">Password</p>
          </div>
        </div>
        {active === "account" && <AccountSettings colleges={colleges}/>}
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

export async function getStaticProps() {
  const colleges = await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/colleges").then((res)=>{
    return res.data
  })
  
  return {
    props: {
      colleges,
    },
  }
}

export default Settings
