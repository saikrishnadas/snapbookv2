import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ModalProvider } from '../ModalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </SessionProvider>
  )
}

export default MyApp
