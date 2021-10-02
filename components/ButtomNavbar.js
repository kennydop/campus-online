import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ActiveTab } from './ActiveTab'
function ButtomNavbar() {
    const [tabActive, setTabActive] = useState('home')
    return (
        <ActiveTab.Provider value = {{tabActive, setTabActive}}>
        {tabActive === 'settings' &&
        <div>
            <Settings />
        </div>
        }
        <div>
            <div className = "flex items-center justify-center absolute space-evenly inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white">
                <div className='mx-auto' onClick = {()=>{setTabActive('home')}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('global')}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('notification')}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('chat')}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{setTabActive('settings')}}><HeaderIcon active = {tabActive === 'settings'?true:undefined} Icon = {CogIcon}/></div>
            </div>
        </div>
        </ActiveTab.Provider>
    )
}

export default ButtomNavbar
