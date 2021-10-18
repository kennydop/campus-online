import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { ActiveTab, PrevTab } from '../contexts/ActiveTab'
import NotificationPane from "./NotificationPane";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";

function ButtomNavbar() {
    const [tabActive, setTabActive] = useState()
    const [prevTab, setPrevTab] = useState()
    const router = useRouter();
    const { currentUser } = useAuth();
    return (
        <>
        {currentUser ?
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

            <div className = "flex items-center justify-center bottom-o fixed space-evenly inset-x-0 z-50 bottom-0 py-3 md:hidden bg-white dark:bg-bdark-100 shadow-mdt">
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); router.push('/'); setTabActive('home')}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); router.push('/'); setTabActive('global')}}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); setTabActive('notification')}}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); router.push('/Chats'); setTabActive('chat')}}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevTab(tabActive); setTabActive('settings')}}><HeaderIcon active = {tabActive === 'settings'?true:undefined} Icon = {CogIcon}/></div>
            </div>
        </PrevTab.Provider>
        </ActiveTab.Provider>
        :
        <div></div>
    }
    </>
    )
}

export default ButtomNavbar
