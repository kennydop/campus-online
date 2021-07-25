import Head from 'next/head'
import Header from "../components/Header";
import Login from './login';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Campus Online</title>
      </Head>

      {/*Header
      <Header />*/}
      <main>
        <Login />
        {/*Sidebar*/}
        {/*Feed*/}
        {/*Widgets*/}
      </main>
    </div>
  )
}
