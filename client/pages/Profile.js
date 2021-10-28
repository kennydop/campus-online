import ProfileCard from '../components/ProfileCard';
import NotAuthorized from '../components/NotAuthorized';
import ProfilePostsAndAbout from '../components/ProfilePostsAndAbout';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
    const {currentUser} = useAuth()

    return (
        currentUser?
            <div className='md:flex bg-blue-grey-50 dark:bg-bdark-200'>
                <div>
                    <ProfileCard />
                </div>
                <div className='flex-1'>
                    <ProfilePostsAndAbout/>
                </div>
            </div>
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
