/* eslint-disable react-hooks/exhaustive-deps */
import ProfileCard from '../components/ProfileCard';
import MyPosts from "../components/MyPosts";
import About from "../components/About";
import { ProfileLayout } from '../Layouts/Layouts';
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Profile() {
    const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
    const router = useRouter()
    const { currentUser } = useAuth()
    const [ admin, setAdmin] = useState()
    const [ user, setUser] = useState()

    useEffect(()=>{
      if(currentUser.username === router.query.profile){
        setUser(currentUser)
        setAdmin(true);
        if(tabActive==='profile')return; 
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('profile');
      }else{
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('');
        setAdmin(false)
        axios.get(`http://localhost:5000/api/users/${router.query.profile}`, { params:{ currentUser: currentUser._id} }).then((res)=>{
          setUser(res.data)
        }).catch((error)=>{
          router.replace('/404')
          console.log(error)
        })
      }
    },[])
    
    return (
        user ?
        <>
            <ProfileCard admin={admin} user={user} userId={admin?null:currentUser._id}/>
            <About admin={admin} user={user}/>
            <MyPosts admin={admin} user={user}/>
            <div className='pt-20'></div>
        </> :
          <div className="mt-32">
            <div className="loader mx-auto animate-spin"></div>
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
