import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { ActiveTab, PrevTab, PrevPrevTab } from '../contexts/ActiveTab'
import NotificationPane from "./NotificationPane";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";

function ButtomNavbar() {
    const [tabActive, setTabActive] = useState('home')
    const [prevTab, setPrevTab] = useState()
    const [prevPrevTab, setPrevPrevTab] = useState()
    const router = useRouter();
    const { currentUser } = useAuth();

    // useEffect(()=>{
    //     switch (router.pathname) {
    //         case '/Chats':
    //             setTabActive('chats')
    //             alert('activetab changed to', tabActive)
    //             break;
    //         case '/Profile':
    //             setTabActive('profile')
    //             break;
    //     }
    // }, [])

    useEffect(()=>{
        if(tabActive==='settings'||tabActive==='notification'){
            document.body.classList.add('overflow-hidden')
        }else{
            document.body.classList.remove('overflow-hidden')
        }
    },[tabActive])

    function handleHome(){
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive);
        if(typeof window === 'object' && router.pathname === '/'){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
        router.push('/');
        }
        setTabActive('home')
    }
    
    return (
        <>
        {currentUser ?
        <ActiveTab.Provider value = {{tabActive, setTabActive}}>
        <PrevTab.Provider value = {{prevTab, setPrevTab}}>
        <PrevPrevTab.Provider value ={{prevPrevTab, setPrevPrevTab}}>
        <div>
            <NotificationPane />
        </div>
        <div>
            <Settings />
        </div>

            <div className = "flex items-center justify-center bottom-o fixed space-evenly inset-x-0 z-50 bottom-0 py-3 md:hidden bg-white dark:bg-bdark-100 shadow-mdt">
                <div className='mx-auto' onClick = {()=>{handleHome()}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevPrevTab(prevTab); setPrevTab(tabActive); router.push('/'); setTabActive('global')}}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('notification')}}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevPrevTab(prevTab); setPrevTab(tabActive); router.push('/Chats'); setTabActive('chat')}}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('settings')}}><HeaderIcon active = {tabActive === 'settings'?true:undefined} Icon = {CogIcon}/></div>
            </div>
            </PrevPrevTab.Provider>
        </PrevTab.Provider>
        </ActiveTab.Provider>
        :
        <div></div>
    }
    </>
    )
}

export default ButtomNavbar
