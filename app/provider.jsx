"use client"
import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { MessageContext } from './context/MessageContext'
function Provider({children}) {
  const [messages,setMessages] =useState();
  return (
    
    <div>
        <MessageContext.Provider value={{messages,setMessages}}>
         <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          ></NextThemesProvider>
      {children}
      </MessageContext.Provider>
    </div>
  )
}

export default Provider
