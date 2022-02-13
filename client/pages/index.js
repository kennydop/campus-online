import Feed from './feed';
import Login from './Login';
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
          router.push('/feed')
        }
        else{
          if(currentUser.photoURL){
            router.replace('/addcollege');
          }else{
            router.replace('/addprofileimg');
          }
          setNewbie(true)
        }
    })
  }

  return (
    <div className='bg-blue-grey-50 dark:bg-bdark-200'>
    {currentUser?
        // !newbie ? <Feed/> :
      <></>
    :
    <Login/>
    }

    </div>
  )
}