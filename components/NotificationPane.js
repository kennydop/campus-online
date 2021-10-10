import { ActiveTab, PrevTab } from './ActiveTab';
import { useContext } from "react";
import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import {useUser} from '../firebase/useUser';
import Notification from './Notification'
import { useSession } from "next-auth/client"

function NotificationPane() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const {prevTab, setPrevTab} = useContext(PrevTab)
    // const [notifications, loading, error] = useCollection( db.collection(user.id).orderBy("timestamp", "desc"));
    // const {user} = useUser();
    const [session] = useSession();

    return (
        <div className={`top-0 fixed z-50 bg-white dark:bg-bdark-100 md:w-96 h-screen w-full shadow-md transition-all duration-700 ease-linear ${tabActive === 'notification'?'right-0':'-right-full'}`}>
            <div className='shadow-sm dark:shadow-md py-3 flex cursor-default'>
                <ArrowLeftIcon onClick={()=>setTabActive(prevTab)} className='cursor-pointer h-6 mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center'>Notifications</div>
            </div>
            <div className='overflow-y-auto h-full cursor-default'>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                {/* {
                    notifications?.docs.map(noti => (
                        <Notification text={noti.id}/>
                        )
                )} */}

            </div>
        </div>
    )
}

export default NotificationPane
