import { ArrowLeftIcon } from '@heroicons/react/solid'
import Notification from './Notification'
import { useAuth } from '../contexts/AuthContext';
import { useActiveTab } from "../contexts/ActiveTabContext";

function NotificationPane() {
    const { tabActive, prevTab, setTabActive, setPrevTab, prevPrevTab } = useActiveTab()
    const { currentUser } = useAuth();


    return (
        <div className={`side-bar ${tabActive==='notification'?'translate-x-0':'translate-x-full'}`}>
            <div className='shadow-sm dark:shadow-md py-3 flex cursor-default'>
                <ArrowLeftIcon onClick={()=>{setTabActive(prevTab); setPrevTab(prevPrevTab)}} className='cursor-pointer h-6 mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center'>Notifications</div>
            </div>
            <div className='hide-scrollbar overflow-y-auto h-full cursor-default'>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${currentUser.displayName}. Connect with friends and have fun!!`}/>
            </div>
        </div>
    )
}

export default NotificationPane
