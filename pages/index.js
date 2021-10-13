import Feed from './feed';
import Login from './Login';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../firebase/AuthContext';
import { auth } from "../firebase/firebase";
import { useState } from 'react';
import AddCollege from './AddCollege';
import {useRouter} from 'next/router';

export default function Home() {
  const {currentUser} = useAuth()
  const [newbie, setNewbie] = useState()
  const router = useRouter();

  if(currentUser){
    auth.getRedirectResult().then((res)=>{
      if(res.additionalUserInfo){
        if(res.additionalUserInfo.isNewUser){
          setNewbie(true)
        }
        else{
          setNewbie(false)
        }
      }
    })
  }
  return (
    <div className='h-screen bg-blue-grey-50 dark:bg-bdark-200 overflow-hidden'>
    {/* {currentUser ? (newbie ? router.replace('/AddCollege') : <Feed/>) : <Login/>} */}
    <AddCollege/>
    </div>
  )
}
Home.getLayout = function getLayout(page) {
  return (
      <SiteLayout>
          {page}
      </SiteLayout>
  )
}
// export async function getServerSideProps(){
//   //Get user
//   const {currentUser} = useAuth()
//   return{
//     props:{
//       currentUser
//     }
//   }
// }