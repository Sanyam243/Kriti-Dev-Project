"use client"
import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessageContext } from './context/MessageContext'
import { UserContext } from './context/UserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
function Provider({children}) {
  const [messages,setMessages] =useState();
  const [user,setUser] =useState();
  return (
    
    <div>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserContext.Provider value={{user,setUser}}>
        <MessageContext.Provider value={{messages,setMessages}}>
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
