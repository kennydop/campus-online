import Head from 'next/head'
import HomePage from './HomePage'
import Link from "next/link";
import {getSession, signIn, signOut, useSession} from "next-auth/client";
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


export default function Home({session}) {
  return (
    // <Router>
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

        {/* <Switch>
          <Route path = "./login">
            <Login />
          </Route>
          <Route path = "./signup">
            <Signup />
          </Route>
          <Route path = "./homepage">
            <HomePage />
          </Route>
        </Switch> */}
      </main>
    </div>
    //</Router> 
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