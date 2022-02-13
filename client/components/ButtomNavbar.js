import HeaderIcon from "./HeaderIcon";
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";
import { useActiveTab } from "../contexts/ActiveTabContext";

function ButtomNavbar() {
  const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
  const router = useRouter();
  const { currentUser } = useAuth();

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
  <div className = "flex items-center justify-center fixed space-evenly inset-x-0 z-50 bottom-0 py-3 md:hidden bg-white dark:bg-bdark-100 shadow-mdt">
    {currentUser ? <>
    <div className='mx-auto' onClick = {()=>{handleHome()}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
    <div className='mx-auto' onClick = {()=>{handleGlobal()}}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
    <div className='mx-auto' onClick = {()=>{if(tabActive==='post')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('post')}}><HeaderIcon active = {tabActive === 'post'?true:undefined} Icon = {PlusCircleIcon}/></div>
    <div className='mx-auto' onClick = {()=>{if(tabActive==='chat')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); router.push('/chats'); setTabActive('chat')}}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
    <div className='mx-auto' onClick = {()=>{if(tabActive==='notification')return; setPrevPrevTab(prevTab); setPrevTab(tabActive); setTabActive('notification')}}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
    </>:
    <div className="items-center justify-center text-center cursor-pointer text-pink-500 font-semibold" onClick={()=>{router.replace('/login')}}>
      Login
    </div>
    }
  </div>
)
}

export default ButtomNavbar
