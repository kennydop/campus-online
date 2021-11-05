/* eslint-disable react-hooks/exhaustive-deps */
import ProfileCard from '../components/ProfileCard';
import MyPosts from "../components/MyPosts";
import About from "../components/About";
import { ProfileLayout } from '../Layouts/Layouts';
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';

function Profile() {
    const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()

    useEffect(()=>{
        if(tabActive==='profile')return; 
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('profile');
    },[])
    
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
