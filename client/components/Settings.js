/* eslint-disable react-hooks/exhaustive-deps */
import SettingItems from "./SettingItems";
import {LogoutIcon, QuestionMarkCircleIcon, MoonIcon, ArrowLeftIcon, UserIcon} from '@heroicons/react/solid';
import {useAuth} from "../contexts/AuthContext";
import { useTheme } from 'next-themes'
import { useRouter } from "next/router";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from "react";

function Settigs() {
    const { tabActive, prevTab, setTabActive, setPrevTab, prevPrevTab } = useActiveTab()
    const {theme, resolvedTheme, setTheme} = useTheme()
    const { logout } = useAuth();
    const router = useRouter()
    useEffect(()=>{
        if(!theme || theme === 'system'){
            setTheme(resolvedTheme)
        }
    },[])

    return (
        <div className={`side-bar ${tabActive === 'settings'?'translate-x-0':'translate-x-full'}`}>
            <div className='shadow-sm dark:shadow-md py-3 flex w-full cursor-default'>
                <ArrowLeftIcon onClick={()=>{setTabActive(prevTab); setPrevTab(prevPrevTab)}} className='cursor-pointer h-6  mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center '>Settings</div>
            </div>
            <div>
                <div onClick={()=> {setPrevTab('settings') ;setTabActive('home')}}><SettingItems Icon={QuestionMarkCircleIcon} title ='Help and Support'/></div>
                <div onClick={()=> {setPrevTab('settings') ;setTabActive('home')}}><SettingItems Icon={MoonIcon} title = 'Display Accessibilities'/></div>
                <div onClick={()=> {setPrevTab('settings') ;setTabActive('home')}}><SettingItems Icon={UserIcon} title = 'Account Settings'/></div>
                <div onClick={()=> { setTabActive('home'); logout()}}><SettingItems Icon={LogoutIcon} title = 'Log Out'/></div>
            </div>
            <div className='bottom-20 md:bottom-0 my-2 absolute w-full border-t border-gray-400 dark:border-bdark-200'>
            <div className="flex items-center mx-4 my-2">
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only" checked={theme === 'dark'? true : false} onChange={()=>{setTheme(theme === 'dark' ? 'light' : 'dark')}}/>
                        <div className="block bg-gray-500 dark:bg-bdark-200 w-12 h-7 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-400 w-5 h-5 rounded-full transition"></div>
                    </div>
                </label>
                <div className="ml-3 text-gray-500 dark:text-gray-400">
                    Dark Mode
                </div>
            </div>
            </div>
        </div>
    )
}
export default Settigs
