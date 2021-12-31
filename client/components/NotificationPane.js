import { ArrowLeftIcon } from '@heroicons/react/solid'
import Notification from './Notification'
import { useAuth } from '../contexts/AuthContext';
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect, useState } from 'react';
import axios from 'axios';

function NotificationPane() {
  const { tabActive, setTabActive } = useActiveTab()
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState();

  useEffect(()=>{
    async function getNotifications(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/notifications/"+currentUser._id).then((res)=>{
        setNotifications(res.data)
      })
    }
    getNotifications()
  },[])

  return (
    <div className={`side-bar ${tabActive[tabActive.length-1]==='notification'?'translate-x-0':'translate-x-full'}`}>
      <div className='shadow-sm dark:shadow-md py-3 flex cursor-default'>
        <ArrowLeftIcon onClick={()=>{setTabActive("go back")}} className='cursor-pointer h-6 mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
        <div className='self-center text-gray-500 dark:text-gray-400 items-center'>Notifications</div>
      </div>
      <div className='hide-scrollbar overflow-y-auto h-full cursor-default'>
        {
          notifications ?
            notifications.length !== 0 ?
            notifications.map((notification)=>
              <Notification message={notification.message.replace('$__user$', currentUser.username)} read={notification.read}/>
            )
            :
            <div className='mt-16 mx-3 flex flex-col justify-center items-center cursor-default text-gray-500 dark:text-gray-400 space-y-3'>
              You do not have any notifications at the moment
            </div>
            :
            <div className="loader-bg mx-auto animate-spin mt-5 z-50"/>
            
        }
        {/* <div className='mt-20'/> */}
      </div>
    </div>
  )
}

export default NotificationPane
