import { ActiveTab, PrevTab } from './ActiveTab';
import { useContext } from "react";
import { ArrowLeftIcon } from '@heroicons/react/solid'
import Notification from './Notification'
import { useAuth } from '../firebase/AuthContext';

function NotificationPane() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const {prevTab, setPrevTab} = useContext(PrevTab)
    const { currentUser } = useAuth();

    return (
        <div className={`top-0 right-0 fixed z-50 bg-white dark:bg-bdark-100 md:w-96 h-screen w-full shadow-md transition-all duration-300 ease-in-out ${tabActive === 'notification'?'translate-x-0':'-translate-x-full'}`}>
            <div className='shadow-sm dark:shadow-md py-3 flex cursor-default'>
                <ArrowLeftIcon onClick={()=>setTabActive(prevTab)} className='cursor-pointer h-6 mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center'>Notifications</div>
            </div>
            <div className='overflow-y-auto h-full cursor-default'>
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
