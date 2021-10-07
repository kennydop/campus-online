import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ActiveTab, PrevTab } from './ActiveTab'
import NotificationPane from "./NotificationPane";
import { useRouter } from 'next/router';

function ButtomNavbar() {
    const [tabActive, setTabActive] = useState('home')
    const [prevTab, setPrevTab] = useState()
    const router = useRouter();

    return (
        <ActiveTab.Provider value = {{tabActive, setTabActive}}>
        <PrevTab.Provider value = {{prevTab, setPrevTab}}>
        {tabActive === 'notification' &&
        <div>
            <NotificationPane />
        </div>
        }
        {tabActive === 'settings' &&
        <div>
            <Settings />
        </div>
        }

        <div>
            <div className = "flex items-center justify-center absolute space-evenly inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white dark:bg-bdark-100">
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); router.push('/'); setTabActive('home')}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); setTabActive('global')}}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); setTabActive('notification')}}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); router.push('/Chats'); setTabActive('chat')}}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); setTabActive('settings')}}><HeaderIcon active = {tabActive === 'settings'?true:undefined} Icon = {CogIcon}/></div>
            </div>
        </div>
        </PrevTab.Provider>
        </ActiveTab.Provider>
    )
}

export default ButtomNavbar
