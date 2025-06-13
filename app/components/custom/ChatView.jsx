

"use client"
import { useConvex, useMutation } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { api } from '../../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import { MessageContext } from '../../context/MessageContext'
import ReactMarkDown from 'react-markdown'
import Image from 'next/image'
import { Link, ArrowRight, Loader2Icon, Mic } from 'lucide-react'
import axios from 'axios';
import Prompt from '../llm/Prompt';

// export const countToken=(inputText)=>{
// return inputText.trim().split(/\s+/).filter(word=>word).length; 
// }
export const countToken = (text) => {
  return Math.ceil(text.length / 4); // crude approximation
}

function ChatView() {
  const { workspaceId } = useParams();
  const convex = useConvex()
  const { messages, setMessages } = useContext(MessageContext);
  const { user, setUser } = useContext(UserContext)
  const [prompt, setPrompt] = useState("")
  const [loading,setLoading] =useState(false)
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace)
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
const UpdateToken=useMutation(api.user.UpdateToken);


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
   
   
    await UpdateMessages({
      messages:[...messages, AiResult],
      workspaceId: id
    })
    
    const token= Number(user?.token)-Number(countToken(JSON.stringify(AiResult)))
    setUser((prev) => ({ ...prev, token: token }))
    await UpdateToken({
      userId:user?._id,
      token:token
    })

    setLoading(false)
  }

  const onGenerate = async (input) => {
    if(user?.token<10){
    toast("You don't have enough tokens to generate a response. Please upgrade your plan.")
    return;
    }
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

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
      };
      setRecognition(speechRecognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div className='relative h-[85vh] flex flex-col p-2 gap-3 '>
      <div className='flex-1 gap-2 overflow-y-scroll pl-2 scrollbar-hide '>
        {messages?.length>0 && messages?.map((message, index) => (
          <div key={index} className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center leading-7 '>
            <ReactMarkDown className='flex flex-col'>{message.content}</ReactMarkDown>
          </div>
        ))}
        {loading&& <div className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center '> <Loader2Icon className='animate-spin'></Loader2Icon> Generating Response...</div>}
      </div>

      <div className='flex gap-2 items-end cursor-pointer'>{user&&<Image src={user?.image} alt='user' width={30} height={30} />}
        <div className='p-5 rounded-xl w-full bg-gray-800' style={{backgroundColor:"grey"}}>
          <div className='flex gap-2'>
            <textarea value={prompt} onChange={(e) => {
              setPrompt(e.target.value)
            }} className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md' placeholder='What you want to build' type="text-area" />
            {prompt != "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}
          </div>
          <div className='flex items-center gap-2'>
            <Mic className={`cursor-pointer w-6 h-6 ${isListening ? 'text-red-500' : 'text-white'}`} onClick={isListening ? stopListening : startListening} />
            {/* <Link className='w-7 h-5' /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView











