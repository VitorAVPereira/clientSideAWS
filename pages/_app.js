import Navbar from '../src/components/navbar/navbar.js'
import '../styles/globals.css'
import { AuthProvider } from '../src/context/AuthContext.js';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
    )
}