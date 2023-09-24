import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { auth } from '../../firebase'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setUser(user)
      else setUser(null)
    })


  }, [])
  return (
    <>
      <Navbar user={user} />
      <Component {...pageProps} user={user} />
    </>
  )
}
