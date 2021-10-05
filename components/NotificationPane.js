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
        <div className={`top-0 fixed z-50 bg-white md:w-96 h-screen w-full shadow-md ${tabActive === 'notification'?'right-0 duration-300':'duration-700 -right-full'}`}>
            <div className='border-b border-gray-400 py-3 flex'>
                <ArrowLeftIcon onClick={()=>setTabActive(prevTab)} className='cursor-pointer h-6 mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500'/>
                <div className='self-center text-gray-500 items-center '>Notifications</div>
            </div>
            <div className='overflow-y-auto h-full'>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
                <Notification text={`Hello, ${session.user.name}. Connect with friends and have fun!!`} read={true}/>
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
