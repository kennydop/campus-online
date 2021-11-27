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
  const [ loggedIn, setLoggedIn] = useState()

  useEffect(()=>{
    if(currentUser){
      setLoggedIn(true)
      if(currentUser.username === router.query.profile){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`).then((res)=>{
          setUser(res.data)
          setAdmin(true);
        }).catch((error)=>{
          router.replace('/404')
          console.log(error)
        })
        if(tabActive==='profile')return; 
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('profile');
      }else{
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('');
        setAdmin(false)
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`, { params:{ currentUser: currentUser._id} }).then((res)=>{
          setUser(res.data)
        }).catch((error)=>{
          router.replace('/404')
          console.log(error)
        })
      }
    }else{
      setAdmin(false)
      setLoggedIn(false)
      if(router.isReady){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`).then((res)=>{
        setUser(res.data)
      }).catch((error)=>{
        router.replace('/404')
        console.log(error)
      })}
    }
  },[router.isReady, router.query.profile])
    
  return (
    user ?
    <>
      <ProfileCard admin={admin} user={user} userId={!admin ? (loggedIn ? currentUser._id : null) : null} loggedIn={loggedIn}/>
      <About admin={admin} user={user}/>
      <MyPosts admin={admin} user={user}/>
      <div className='pt-20'></div>
    </>
      :
    <div className="mt-8">
      <div className="loader-bg mx-auto animate-spin"></div>
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
