import Head from 'next/head'
import {getSession, useSession} from "next-auth/client";
import HomePage from './HomePage'
import Login from './Login';

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
            <HomePage />
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