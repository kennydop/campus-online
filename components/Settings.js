import SettingItems from "./SettingItems";
import {LogoutIcon, QuestionMarkCircleIcon, MoonIcon, ArrowLeftIcon, UserIcon} from '@heroicons/react/solid';
import { useContext } from "react";
import {signOut} from "next-auth/client";
import { auth } from '../firebase/firebase'
import { ActiveTab, PrevTab } from './ActiveTab';

function logOut(){
    auth.signOut();
    signOut();
    router.replace('/Login')
}

function Settigs() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const {prevTab, setPrevTab} = useContext(PrevTab)

    return (
         <div className={`top-0 fixed z-50 bg-white dark:bg-bdark-100 md:w-96 h-screen w-full shadow-md ${tabActive === 'settings'?'right-0 duration-300':'duration-700 -right-full'}`}>
            <div className='border-b border-gray-400 dark:border-bdark-200 py-3 flex w-full'>
                <ArrowLeftIcon onClick={()=>setTabActive(prevTab)} className='cursor-pointer h-6  mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center '>Settings</div>
            </div>
            <div>
                <div onClick={()=> setTabActive('home')}><SettingItems Icon={QuestionMarkCircleIcon} title ='Help and Support'/></div>
                <div onClick={()=> setTabActive('home')}><SettingItems Icon={MoonIcon} title = 'Display Accessibilities'/></div>
                <div onClick={()=> setTabActive('home')}><SettingItems Icon={UserIcon} title = 'Account Settings'/></div>
                <div onClick={ logOut }><SettingItems Icon={LogoutIcon} title = 'Log Out'/></div>
            </div>
            <div className='bottom-12 md:bottom-0 my-2 absolute w-full border-t border-gray-400 dark:border-bdark-200'>
            <div className="flex items-center mx-4 my-2">
                <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only" />
                        <div className="block bg-gray-500 dark:bg-bdark-200 w-12 h-7 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-400 w-5 h-5 rounded-full transition"></div>
                    </div>
                    <div className="ml-3 text-gray-500 dark:text-gray-400">
                        Dark Mode
                    </div>
                </label>
            </div>
            </div>
        </div>
    )
}
export default Settigs