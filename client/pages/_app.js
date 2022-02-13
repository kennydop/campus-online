import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import { ThemeProvider } from 'next-themes'
import { AuthProvider } from '../contexts/AuthContext';
import { ActiveTab } from '../contexts/ActiveTabContext';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>)

  return(
    <AuthProvider>
      <Head>
        <title>Campus Online</title>
        <link rel='icon' href="/favicon.png"/>
      </Head>
      <ActiveTab>
        <ThemeProvider attribute="class" enableSystem={true} defaultTheme='system'>
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </ActiveTab>
    </AuthProvider>
  )
}