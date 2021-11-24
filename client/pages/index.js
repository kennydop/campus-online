import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const {currentUser} = useAuth()
  const router = useRouter()
  
  if(currentUser){
    if(currentUser.college && currentUser.profilePicture){
      router.push('/feed')
    }else{
      if(currentUser.profilePicture){
        router.replace('/addcollege');
      }else{
        router.replace('/addprofileimg');
      }
    }
  }else{
    router.replace('/login')
  }

  return (
    <div className='bg-blue-grey-50 dark:bg-bdark-200'>
    </div>
  )
}