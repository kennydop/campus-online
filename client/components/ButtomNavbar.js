import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import NotificationPane from "./NotificationPane";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";
import { useActiveTab } from "../contexts/ActiveTabContext";

function ButtomNavbar() {
    const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
    const router = useRouter();
    const { currentUser } = useAuth();

    useEffect(()=>{
        if(tabActive==='settings'||tabActive==='notification'){
            document.body.classList.add('overflow-hidden')
        }else{
            document.body.classList.remove('overflow-hidden')
        }
    },[tabActive])

    function handleHome(){
        if(typeof window === 'object' && router.pathname === '/feed'){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
        router.push('/feed');
        }
        if(tabActive==='home')
            return;
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive);
        setTabActive('home')
    }

    function handleGlobal(){
        if(typeof window === 'object' && router.pathname === '/global'){
            window.scrollTo({top: 0, behavior: 'smooth'})
        }else{
        router.push('/global');
        }
        if(tabActive==='global')
            return;
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive);
        setTabActive('global')
    }
    
    return (
        <>
        {currentUser && <div>
            <NotificationPane />
        </div>}
        {currentUser && <div>
            <Settings />
        </div>}
            <div className = "flex items-center justify-center bottom-o fixed space-evenly inset-x-0 z-50 bottom-0 py-3 md:hidden bg-white dark:bg-bdark-100 shadow-mdt">
                {currentUser ? <>
                <div className='mx-auto' onClick = {()=>{handleHome()}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div className='mx-auto' onClick = {()=>{handleGlobal()}}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto' onClick = {()=>{if(tabActive==='notification')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('notification')}}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div className='mx-auto' onClick = {()=>{if(tabActive==='chat')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); router.push('/Chats'); setTabActive('chat')}}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>{if(tabActive==='settings')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('settings')}}><HeaderIcon active = {tabActive === 'settings'?true:undefined} Icon = {CogIcon}/></div>
                </>:
                <div className="flex items-center justify-center space-x-3">
                  <button className='h-8 w-24 rounded-full shadow-md  text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl bg-pink-500 text-white dark:text-gray-200' onClick={()=>{router.replace('/login')}}>Login</button>
                  <button className='h-8 w-24 rounded-full shadow-md border border-pink-500 text-pink-500 text-center bg-white dark:bg-bdark-200 cursor-pointer hover:shadow-lg dark:text-pink-500 dark:shadow-lg dark:hover:shadow-xl' onClick={()=>{router.replace('/signup')}}>Sign Up</button>
                </div>}
            </div>

    </>
    )
}

export default ButtomNavbar
