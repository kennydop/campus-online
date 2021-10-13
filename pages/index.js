import Feed from './feed';
import Login from './Login';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../firebase/AuthContext';
import { auth } from "../firebase/firebase";
import { useState } from 'react';
import AddCollege from './addcollege';
import { useRouter } from 'next/router';

export default function Home() {
  const {currentUser} = useAuth()
  const [newbie, setNewbie] = useState()
  const router = useRouter()
  if(currentUser){
    auth.getRedirectResult().then((res)=>{
      if(res.additionalUserInfo){
        if(res.additionalUserInfo.isNewUser){
          setNewbie(true)
          router.replace('/addcollege');
        }
        else{
          setNewbie(false)
        }
      }
    })
  }
  return (
    currentUser?(newbie?<></>:<Feed/>) : <Login/>
  )
}
Home.getLayout = function getLayout(page) {
  return (
      <SiteLayout>
          {page}
      </SiteLayout>
  )
}