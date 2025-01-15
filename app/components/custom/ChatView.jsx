"use client"
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import Image from 'next/image'
import { Link, ArrowRight } from 'lucide-react'

function ChatView() {
  const { workspaceId } = useParams();
  const convex = useConvex()
  const [messages, setMessages] = useState()
  const { user, setUser } = useContext(UserContext)
  const [prompt, setPrompt] = useState("")

  const GetWorkspace = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: workspaceId
    })
    console.log(result)
    setMessages(result?.messages)
  }

  useEffect(() => {
    GetWorkspace();
  }, [])
  return (
    <div className=' relative h-[85vh] flex flex-col p-2 gap-3 '>
      <div className='flex-1 overflow-y-scroll'>
        {messages && messages.map((message, index) => (
          <div key={index} className='flex gap-2 bg-slate-600 p-2 rounded-md items-center '>
            {message.content}
            {message?.role == 'user' && <Image className='rounded-full' src={user?.image} alt='User Image' width={40} height={40}></Image>}
          </div>
        ))}
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
