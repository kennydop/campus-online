import ButtomNavbar from '../components/ButtomNavbar';
import ProfileCard from '../components/ProfileCard';
import Header from '../components/Header';
import { ActiveTab } from '../components/ActiveTab';
import { useContext } from "react";

function Profile() {
    const {tabActive, setTabActive} = useContext(ActiveTab)
    return (
        <div className='bg-blue-grey-50'>
            <Header/>
            <ButtomNavbar />
            <ProfileCard />
        </div>
    )
}

export default Profile
