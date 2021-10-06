import ButtomNavbar from '../components/ButtomNavbar';
import ProfileCard from '../components/ProfileCard';
import Header from '../components/Header';
import { ActiveTab } from '../components/ActiveTab';
import { useContext } from "react";
import NotAuthorized from '../components/NotAuthorized';
import {useSession} from 'next-auth/client';

function Profile() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    const [session, loading] = useSession();

    return (
        <>
        {session &&(
            <div className='bg-blue-grey-50'>
                <Header/>
                <ButtomNavbar />
                <ProfileCard />
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
