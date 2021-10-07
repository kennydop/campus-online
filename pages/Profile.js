import ButtomNavbar from '../components/ButtomNavbar';
import ProfileCard from '../components/ProfileCard';
import Header from '../components/Header';
import { ActiveTab } from '../components/ActiveTab';
import { useContext, useState } from "react";
import NotAuthorized from '../components/NotAuthorized';
import {useSession} from 'next-auth/client';

function Profile() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const [session, loading] = useSession();
    const [tab, setTab] = useState('posts')


    return (
        <>
        {session &&(
            <div className='bg-blue-grey-50 dark:bg-bdark-200'>
                <Header/>
                <ButtomNavbar />
                <ProfileCard />
                <div className='flex mt-5 pb-2 self-center space-x-3'>
                    <div onClick={()=> setTab('posts')} className={`text-right mr-3 cursor-pointer ${tab === 'posts'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>Posts</div>
                    <div onClick={()=> setTab('about')} className={`text-left ml-3 cursor-pointer ${tab === 'about'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>About</div>
                </div>
            </div>
            )}
            {!session &&(
                !loading &&
                <NotAuthorized />
            )}
        </>
    )
}

export default Profile
