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
import NotFound from './404';

function Profile() {
  const { setTabActive } = useActiveTab()
  const router = useRouter()
  const { currentUser } = useAuth()
  const [ admin, setAdmin] = useState()
  const [ notFound, setNotFound] = useState(false)
  const [ user, setUser] = useState()
  const [ loggedIn, setLoggedIn] = useState()

  useEffect(()=>{
    setNotFound(false)
    async function getMyProfile(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`).then((res)=>{
        setUser(res.data)
        setAdmin(true);
      }).catch((error)=>{
        setNotFound(true)
        console.log(error)
      })
    }
    async function getUserProfile_LoggedIn(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`, { params:{ currentUser: currentUser._id} }).then((res)=>{
        setUser(res.data)
      }).catch((error)=>{
        setNotFound(true)
        console.log(error)
      })
    }

    async function getUserProfile_NotLoggedIn(){
      if(router.isReady){
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`).then((res)=>{
        setUser(res.data)
        }).catch((error)=>{
          setNotFound(true)
          console.log(error)
        })
      }
    }

    if(currentUser){
      setLoggedIn(true)
      if(currentUser.username === router.query.profile){
        getMyProfile()
        setTabActive('profile');
      }else{
        setTabActive('');
        setAdmin(false)
        getUserProfile_LoggedIn()
      }
    }else{
      setAdmin(false)
      setLoggedIn(false)
      getUserProfile_NotLoggedIn()
    }
  },[router.isReady, router.query.profile])
    
  function refreshUser(){
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${router.query.profile}`, { params:{ currentUser: currentUser._id} }).then((res)=>{
      setUser(res.data)
    }).catch((error)=>{
      setNotFound(true)
      console.log(error)
    })
  }

  return (
    notFound ?
      <NotFound/>
      :
      user ?
      <>
        <ProfileCard admin={admin} user={user} loggedIn={loggedIn} refreshUser={refreshUser}/>
        <About admin={admin} user={user}/>
        <MyPosts admin={admin} user={user} refreshUser={refreshUser}/>
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
