import ProfileCard from '../components/ProfileCard';
import NotAuthorized from '../components/NotAuthorized';
import ProfilePostsAndAbout from '../components/ProfilePostsAndAbout';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { ActiveTab } from "../contexts/ActiveTab";
function Profile() {
    const {currentUser} = useAuth()
    const [tabActive, setTabActive] = useState('profile')

    return (
        currentUser?
        <ActiveTab.Provider value ={{tabActive, setTabActive}}>
            <div className='md:flex bg-blue-grey-50 dark:bg-bdark-200'>
                <div>
                    <ProfileCard />
                </div>
                <div className='flex-1'>
                    <ProfilePostsAndAbout/>
                </div>
            </div>
        </ActiveTab.Provider>

            :
            <NotAuthorized />

    )
}
Profile.getLayout = function getLayout(page) {
    return (
        <SiteLayout>
            {page}
        </SiteLayout>
    )
}
export default Profile
