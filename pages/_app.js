import Navbar from '../src/components/navbar/navbar.js'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
    )
}