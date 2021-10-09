import ButtomNavbar from '../components/ButtomNavbar';
import ProfileCard from '../components/ProfileCard';
import Header from '../components/Header';
import { ActiveTab } from '../components/ActiveTab';
import { useContext, useState } from "react";
import NotAuthorized from '../components/NotAuthorized';
import {useSession} from 'next-auth/client';
import ProfilePostsAndAbout from '../components/ProfilePostsAndAbout';
import Layout from '../components/Layout';

function Profile() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const [session, loading] = useSession();


    return (
        <>
        {session &&(
            <div className='bg-blue-grey-50 dark:bg-bdark-200'>
                <div className='md:flex w-screen'>
                    <ProfileCard />
                    <ProfilePostsAndAbout/>
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
Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Profile
