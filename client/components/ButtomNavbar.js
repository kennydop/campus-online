import HeaderIcon from "./HeaderIcon";
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useUtils } from "../contexts/UtilsContext";

function ButtomNavbar() {
  const { tabActive, setTabActive } = useActiveTab()
  const router = useRouter();
  const { currentUser } = useAuth();
  const { unreadNotifications, setUnreadNotifications, unreadChats, newPosts, setRefreshPosts } = useUtils();

  function handleHome(){
    if(typeof window === 'object' && router.pathname === '/feed'){
      window.scrollTo({top: 0, behavior: 'smooth'})
      newPosts > 0 && setRefreshPosts(true)
    }else{
      router.push('/feed');
    }
    setTabActive('home')
  }

  function handleGlobal(){
    if(typeof window === 'object' && router.pathname === '/global'){
      window.scrollTo({top: 0, behavior: 'smooth'})
    }else{
    router.push('/global');
    }
    setTabActive('global')
  }

return (
  <div className = "flex items-center justify-center fixed space-evenly inset-x-0 z-50 bottom-0 py-3 md:hidden bg-white dark:bg-bdark-100 shadow-mdt">
    {currentUser ? <>
    <div className='mx-auto' onClick = {handleHome}><HeaderIcon active = {tabActive[tabActive.length -1] === 'home'?true:undefined} Icon = {HomeIcon} unread={newPosts !==0 && newPosts}/></div>
    <div className='mx-auto' onClick = {handleGlobal}><HeaderIcon active = {tabActive[tabActive.length -1] === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
    <div className='mx-auto' onClick = {()=>{setTabActive('post')}}><HeaderIcon active = {tabActive[tabActive.length -1].slice(0, 4) === 'post'?true:undefined} Icon = {PlusCircleIcon}/></div>
    <div className='mx-auto' onClick = {()=>{setTabActive('chat'); router.push('/chats')}}><HeaderIcon active = {tabActive[tabActive.length -1] === 'chat'?true:undefined} Icon = {ChatAlt2Icon} unread={unreadChats?.length !== 0 && unreadChats?.length}/></div>
    <div className='mx-auto' onClick = {()=>{setTabActive('notification'); setUnreadNotifications(0)}}><HeaderIcon active = {tabActive[tabActive.length -1] === 'notification'?true:undefined} Icon = {BellIcon} unread={unreadNotifications !== 0 && unreadNotifications}/></div>
    </>:
    <div className="items-center justify-center text-center cursor-pointer text-pink-500 font-semibold" onClick={()=>{router.replace('/login')}}>
      Login
    </div>
    }
  </div>
)
}

export default ButtomNavbar
