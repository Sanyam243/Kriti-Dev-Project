"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import ReactMarkDown from 'react-markdown'
import Image from 'next/image'
import { Link, ArrowRight, Loader2Icon } from 'lucide-react'
import axios from 'axios';
import Prompt from '../llm/Prompt';

function ChatView() {
  const { workspaceId } = useParams();
  const convex = useConvex()
  const [messages, setMessages] = useState()
  const { user, setUser } = useContext(UserContext)
  const [prompt, setPrompt] = useState("")
  const [loading,setLoading] =useState(false)
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace)

  useEffect(() => {
    workspaceId && GetWorkspace();

  }, [workspaceId])
  const GetWorkspace = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: workspaceId
    })
    console.log(result)
    setMessages(result?.messages)
  }

  const GetAiResponse = async () => {
    setLoading(true)
    const response = await axios.post('/api/llm-chat', {
      prompt: JSON.stringify(messages) + Prompt.CHAT_PROMPT
    })

    const AiResult = {
      content: response.data.AiResponse,
      role: 'ai'
    }
    setMessages((prev) => [...prev, AiResult])
    setLoading(false)

  }

  const onGenerate = async (input) => {
    const msg ={
        role: 'user',
        content: input
    }
    setMessages((prev) => [...prev, msg])

    await UpdateWorkspace({
      workspaceId:workspaceId,
      messages:[...messages,msg]
    })

    setPrompt("")
    
}



  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role
      if (role == 'user') {
        GetAiResponse();
      }
    }

  }, [messages])
  return (
    <div className=' relative h-[85vh] flex flex-col p-2 gap-3 '>
      <div className='flex-1 gap-2 overflow-y-scroll p-3 scrollbar-hide '>
        {messages && messages?.map((message, index) => (
          <div key={index} className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center leading-7 '>
           
            <ReactMarkDown className='flex flex-col'>{message.content}</ReactMarkDown>
            {message?.role == 'user' && <Image className='rounded-full' src={user?.image||"image"} alt='User Image' width={40} height={40}></Image>}
           
          </div>
          
        ))}
        {loading&& <div className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center '> <Loader2Icon className='animate-spin'></Loader2Icon> Generating Response...</div>}
      </div>


      <div className=' rounded-xl w-full p-2 bg-gray-800'>
        <div className='w-full flex'>

          <textarea value={prompt} onChange={(e) => {
            setPrompt(e.target.value)
          }} className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md' placeholder='What you want to build' type="text-area"
          />
          {prompt != "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}

        </div>
        <div><Link className='w-7 h-5' /></div>
      </div>
    </div>
  )
}

export default ChatView
