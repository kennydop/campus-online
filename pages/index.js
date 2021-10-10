import Head from 'next/head';
import {getSession, session} from "next-auth/client";
import Campusonline from './campusonline';
import Login from './Login';
import {useRouter} from 'next/router';
import { useEffect } from 'react';
import SiteLayout from '../components/SiteLayout';

export default function Home({session}) {
  const router = useRouter()
  
  useEffect(()=>{
    if(!session){
      router.replace('/Login')
    }
  },[])
  return (
    <div className='h-screen bg-blue-grey-50 dark:bg-bdark-200 overflow-hidden'>
      <Head>
        <title>Campus Online</title>
      </Head>

      <main>
        {/* {!session && (
          // <Login />
          router.replace('/Login')
        )}         */}
        {session && (
            <Campusonline />
          )
        }
      </main>
    </div>
  )
}
// Home.getLayout = function getLayout(page) {
//   return (
//       <SiteLayout>
//           {page}
//       </SiteLayout>
//   )
// }
export async function getServerSideProps(context){
  //Get user
  const session = await getSession(context)
  return{
    props:{
      session
    }
  }
}