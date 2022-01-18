import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const {currentUser} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if(currentUser){
      if(currentUser.college && currentUser.profilePicture && currentUser.token){
        router.push('/feed')
      }else{
        if(!currentUser.college){
          router.replace('/addcollege');
        }else if(!currentUser.profilePicture){
          router.replace('/addprofileimg');
        }
      }
    }else{
      router.replace('/login')
    }
  },[])

  return (
    <></>
  )
}