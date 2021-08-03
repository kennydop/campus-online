import Head from 'next/head'
import HomePage from './HomePage'
import Link from "next/link";
import {getSession, signIn, signOut, useSession} from "next-auth/client";
import Login from './login';
import Signup from './Signup';
import campus_online_logo from "../images/campus-online-logo.png";
import Image from "next/image";
import React from "react";


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
        {/* <Login /> */}
        {/* <Signup /> */}
        {/*Sidebar*/}
        {/*Feed*/}
        {/*Widgets*/}
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