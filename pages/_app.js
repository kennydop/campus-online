import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import {Provider} from "next-auth/client"
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return(
    <Provider session = {pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
