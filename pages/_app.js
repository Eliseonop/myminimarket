import { Layout } from '../components/Layout'
import '../styles/globals.css'
import { DataProvider } from '../store/global.state'
function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp
