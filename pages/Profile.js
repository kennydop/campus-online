import ProfileCard from '../components/ProfileCard';
import NotAuthorized from '../components/NotAuthorized';
import ProfilePostsAndAbout from '../components/ProfilePostsAndAbout';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../firebase/AuthContext';

function Profile() {
    const {currentUser} = useAuth()
    return (
        currentUser?
            <div className='bg-blue-grey-50 dark:bg-bdark-200 h-screen'>
                <div className='md:flex w-screen'>
                    <ProfileCard />
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
