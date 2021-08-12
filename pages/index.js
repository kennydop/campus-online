import Head from 'next/head';
import {getSession} from "next-auth/client";
import Feed from './Feed';
import Login from './api/auth/Login';
import { auth, db } from '../firebase/firebase';

export default function Home({session,photoUrl}) {
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
            <Feed photoUrl={photoUrl}/>
          )
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  //Get user
  var photoUrl = null;
  const session = await getSession(context)
  if(session){
    if(!session.user.image){
      const user = auth.currentUser
      db.collection('users').doc(user.id).get().then((doc)=>{
        console.log(doc)
        for (let i = 0; i < doc.data().length; i++) {
          if(doc.data()[i] === 'photoURL'){photoUrl = doc[i].get()}
          
        }
      })
    }
  }
  return{
    props:{
      session,
      photoUrl,
    }
  }
}