"use client"
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { MessageContext } from '../../context/MessageContext'
import Prompt from '../llm/Prompt'

function CodeView() {

  const { messages, setMessages } = useContext(MessageContext);
 
  const generateWesbsiteCode = async()=>{
    
    const AiPrompt = messages[messages?.length-1].content+" "+Prompt.CODE_GEN_PROMPT;
    const response= await axios.post('/api/website-code',{
      prompt:AiPrompt
    })

    console.log(response.data)

  }

   useEffect(() => {
     if (messages?.length > 0) {
     
       const role = messages[messages.length - 1].role
       if (role == 'user') {
         generateWesbsiteCode();
       }
     }
 
   }, [messages])
  return (
    <div>
      Code View
    </div>
  )
}

export default CodeView

