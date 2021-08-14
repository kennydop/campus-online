import Head from 'next/head';
import {getSession} from "next-auth/client";
import Campusonline from './campusonline';
import Login from './Login';
import { auth, db } from '../firebase/firebase';

export default function Home({session}) {
  return (
    <div>
      <Head>
        <title>Campus Online</title>
      </Head>

      <main>
        {!session && (
          <Login />
        )}        {
          session && (
            <Campusonline />
          )
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  //Get user
  const session = await getSession(context)
  return{
    props:{
      session
    }
  }
}