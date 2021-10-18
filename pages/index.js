import Feed from './feed';
import Login from './Login';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../contexts/AuthContext';
import { db } from "../firebase/firebase";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const {currentUser} = useAuth()
  const [newbie, setNewbie] = useState()
  const router = useRouter()
  if(currentUser){
    db.collection('users').doc(currentUser.uid).get().then((doc)=>{
      if(doc.exists){
          setNewbie(false)
        }
        else{
          setNewbie(true)
          router.replace('/addprofileimg');
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