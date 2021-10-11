import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Head from 'next/head';
import { Provider } from "next-auth/client"
import { ThemeProvider } from 'next-themes'
import SiteLayout from '../components/SiteLayout'


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>)
  const dont = Component.dont
  return(
    <Provider session = {pageProps.session}>
      <Head>
        <title>Campus Online</title>
      </Head>
      <ThemeProvider attribute="class">
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  )
}