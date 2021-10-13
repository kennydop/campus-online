import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../firebase/AuthContext';


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>)
  const dont = Component.dont
  return(
    <AuthProvider>
      <Head>
        <title>Campus Online</title>
        <link rel='icon' href="/favicon.png"/>
      </Head>
      <ThemeProvider attribute="class">
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </AuthProvider>
  )
}