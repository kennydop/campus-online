import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState } from "react";

function ButtomNavbar() {
    const [settings, setSettings] = useState(false);
    const [tabActive, setTabActive] = useState('home')
    return (
        <>
        {settings &&
        <div>
            <Settings show={settings}/>
        </div>
        }
        <div>
            <div className = "flex items-center justify-center absolute space-evenly inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white">
                <div className='mx-auto' onClick = {()=>{setSettings(!settings); setTabActive('home')}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('global')}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('notification')}><HeaderIcon Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>setTabActive('chat')}><HeaderIcon Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{setSettings(!settings); setTabActive('settings')}}><HeaderIcon Icon = {CogIcon}/></div>
            </div>
        </div>
        </>
    )
}

export default ButtomNavbar
