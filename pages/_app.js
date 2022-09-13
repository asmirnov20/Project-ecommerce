import Layout from '../components/Layout'
import '../styles/globals.css'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, LayoutGroup } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  return (
    <LayoutGroup>
      <StateContext>
        <Layout>
          <Toaster />
          <AnimatePresence mode='wait'>
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </StateContext>
    </LayoutGroup>
  )
}

export default MyApp
