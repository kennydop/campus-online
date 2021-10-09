import ProfileCard from '../components/ProfileCard';
import NotAuthorized from '../components/NotAuthorized';
import {useSession} from 'next-auth/client';
import ProfilePostsAndAbout from '../components/ProfilePostsAndAbout';
import SiteLayout from '../components/SiteLayout';

function Profile() {
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
        <SiteLayout>
            {page}
        </SiteLayout>
    )
}
export default Profile
