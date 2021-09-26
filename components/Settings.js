import SettingItems from "./SettingItems";
import {QuestionMarkCircleIcon, MoonIcon, ArrowLeftIcon, UserIcon} from '@heroicons/react/solid';
import { useState } from "react";

function Settigs({show}) {
    const [settings, setSettings] = useState(show);
    const showSettings = () => setSettings(!settings);

    return (
         <div className={`top-0 fixed z-50 bg-white md:w-80 h-screen w-full shadow-md duration-300 ${settings?'right-0':'duration-700 -right-full'}`}>
            <div className=' border-b border-gray-400 py-3'>
                <ArrowLeftIcon onClick={showSettings} className='cursor-pointer h-6  ml-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500'/>
            </div>
            <div>
                <div onClick={showSettings}><SettingItems Icon={QuestionMarkCircleIcon} title ='Help and Support' onClick={showSettings}/></div>
                <div onClick={showSettings}><SettingItems Icon={MoonIcon} title = 'Display Accessibilities' onClick={showSettings}/></div>
                <div onClick={showSettings}><SettingItems Icon={UserIcon} title = 'Account Settings' onClick={showSettings}/></div>
            </div>
            <div className='bottom-0 my-2 absolute w-full border-t border-gray-400'>
            <div class="flex items-center mx-4 my-2">
                <label for="toggleB" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input type="checkbox" id="toggleB" className="sr-only" />
                        <div className="block bg-gray-500 w-12 h-7 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition"></div>
                    </div>
                    <div className="ml-3 text-gray-500">
                        Dark Mode
                    </div>
                </label>
            </div>
            </div>
        </div>
    )
}
export default Settigs
