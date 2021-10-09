import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Provider } from "next-auth/client"
import { ThemeProvider } from 'next-themes'
import Layout from '../components/Layout'


export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <>{page}</>)

  return(
    <Provider session = {pageProps.session}>
      {/* <ThemeProvider attribute="class"> */}
        {getLayout(<Component {...pageProps} />)}
      {/* </ThemeProvider> */}
    </Provider>
  )
}