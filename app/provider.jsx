"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessageContext } from './context/MessageContext'
import { UserContext } from './context/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react';
import { api } from '../convex/_generated/api';
import { useRouter } from 'next/navigation';
function Provider({ children }) {
  const convex = useConvex();
  const router = useRouter();
  const [messages, setMessages] = useState();
  const [user, setUser] = useState();
  const isAuthenticated = async () => {
    if (typeof window != undefined) {
      const user = JSON.parse(localStorage.getItem('user'))

      if(!user){
        router.push('/')
        return;
      }
      //Fetch the user
      const result = await convex.query(api.user.GetUser, {
        email: user?.email
      })
      setUser(result)
    }
  }

  useEffect(() => {
    isAuthenticated()
  }, [])

  
  return (

    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{ user, setUser }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            ></NextThemesProvider>
            {children}
          </MessageContext.Provider>
        </UserContext.Provider>
      </GoogleOAuthProvider>
    </div>
  )
}

export default Provider
