import Head from 'next/head';
import {getSession} from "next-auth/client";
import Feed from './Feed';
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
            <Feed />
          )
        }
      </main>
    </div>
  )
}
