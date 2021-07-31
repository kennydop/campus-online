import Head from 'next/head'
import Header from "../components/Header";
import Login from './login';
import Signup from './Signup';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Campus Online</title>
      </Head>

      {/*Header
      <Header />*/}
      <main>
        {/* <Login /> */}
        <Signup />
        {/*Sidebar*/}
        {/*Feed*/}
        {/*Widgets*/}
      </main>
    </div>
  )
}
