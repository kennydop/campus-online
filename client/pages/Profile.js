import ProfileCard from '../components/ProfileCard';
import MyPosts from "../components/MyPosts";
import About from "../components/About";
import { ProfileLayout } from '../Layouts/Layouts';

function Profile() {
    return (
        <>
            <ProfileCard />
            <About/>
            <MyPosts/>
        </>
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
