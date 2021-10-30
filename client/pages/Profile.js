import ProfileCard from '../components/ProfileCard';
import MyPosts from "../components/MyPosts";
import About from "../components/About";
import { ProfileLayout } from '../Layouts/Layouts';

function Profile() {
    return (
        <div className='flex-1 flex-col w-screen md:w-full justify-center'>
            <ProfileCard />
            <About/>
            <MyPosts/>
        </div>
    )
}
Profile.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}
export default Profile
