// "use client"
// import { useConvex, useMutation } from 'convex/react';
// import { useParams } from 'next/navigation'
// import React, { useContext, useEffect, useState } from 'react'
// import { api } from '../../../convex/_generated/api';
// import { UserContext } from '../../context/UserContext';
// import { MessageContext } from '../../context/MessageContext'
// import ReactMarkDown from 'react-markdown'
// import Image from 'next/image'
// import { Link, ArrowRight, Loader2Icon } from 'lucide-react'
// import axios from 'axios';
// import Prompt from '../llm/Prompt';


// function ChatView() {
//   const { workspaceId } = useParams();
//   const convex = useConvex()
//   const { messages, setMessages } = useContext(MessageContext);
//   const { user, setUser } = useContext(UserContext)
//   const [prompt, setPrompt] = useState("")
//   const [loading,setLoading] =useState(false)
//   const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace)


//   useEffect(() => {
//     workspaceId && GetWorkspace();

//   }, [workspaceId])
//   const GetWorkspace = async () => {
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: workspaceId
//     })
//     console.log(result)
//     setMessages(result?.messages)
   
//   }

//   const GetAiResponse = async () => {
//     setLoading(true)
//     const response = await axios.post('/api/llm-chat', {
//       prompt: JSON.stringify(messages) + Prompt.CHAT_PROMPT
//     })

//     const AiResult = {
//       content: response.data.AiResponse,
//       role: 'ai'
//     }
//     setMessages((prev) => [...prev, AiResult])
//     setLoading(false)

//   }

//   const onGenerate = async (input) => {
//     const msg ={
//         role: 'user',
//         content: input
//     }
//     setMessages((prev) => [...prev, msg])

//     await UpdateWorkspace({
//       workspaceId:workspaceId,
//       messages:[...messages,msg]
//     })

//     setPrompt("")
    
// }



//   useEffect(() => {
//     if (messages?.length > 0) {
//       const role = messages[messages.length - 1].role
//       if (role == 'user') {
//         GetAiResponse();
//       }
//     }

//   }, [messages])
//   return (
//     <div className=' relative h-[85vh] flex flex-col p-2 gap-3 '>
//       <div className='flex-1 gap-2 overflow-y-scroll pl-2 scrollbar-hide '>
//         {messages?.length>0 && messages?.map((message, index) => (
//           <div key={index} className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center leading-7 '>
           

//             {/* {message?.role == 'user' && <Image className='rounded-full' src={user?.image||"image"} alt='User Image' width={40} height={40}></Image>} */}
//             <ReactMarkDown className='flex flex-col'>{message.content}</ReactMarkDown>
//           </div>
          
//         ))}
//         {loading&& <div className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center '> <Loader2Icon className='animate-spin'></Loader2Icon> Generating Response...</div>}
//       </div>

// <div className='flex gap-2 items-end cursor-pointer'>{user&&<Image src={user?.image} alt='user' width={30} height={30} />}
//       <div className='p-5 rounded-xl w-full bg-gray-800' style={{backgroundColor:"grey"}}>
//         <div className=' flex gap-2'>

//           <textarea value={prompt} onChange={(e) => {
//             setPrompt(e.target.value)
//           }} className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md' placeholder='What you want to build' type="text-area"
//           />
//           {prompt != "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}

//         </div>
//         <div><Link className='w-7 h-5' /></div>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default ChatView










// "use client"
// import { useConvex, useMutation } from 'convex/react';
// import { useParams } from 'next/navigation'
// import React, { useContext, useEffect, useState } from 'react'
// import { api } from '../../../convex/_generated/api';
// import { UserContext } from '../../context/UserContext';
// import { MessageContext } from '../../context/MessageContext'
// import ReactMarkDown from 'react-markdown'
// import Image from 'next/image'
// import { Link, ArrowRight, Loader2Icon, Mic, MicOff } from 'lucide-react'
// import axios from 'axios';
// import Prompt from '../llm/Prompt';

// function ChatView() {
//   const { workspaceId } = useParams();
//   const convex = useConvex()
//   const { messages, setMessages } = useContext(MessageContext);
//   const { user } = useContext(UserContext)
//   const [prompt, setPrompt] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [listening, setListening] = useState(false);
//   const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace)

//   useEffect(() => {
//     workspaceId && GetWorkspace();
//   }, [workspaceId])

//   const GetWorkspace = async () => {
//     const result = await convex.query(api.workspace.GetWorkspace, {
//       workspaceId: workspaceId
//     })
//     setMessages(result?.messages)
//   }

//   const GetAiResponse = async () => {
//     setLoading(true)
//     const response = await axios.post('/api/llm-chat', {
//       prompt: JSON.stringify(messages) + Prompt.CHAT_PROMPT
//     })

//     const AiResult = {
//       content: response.data.AiResponse,
//       role: 'ai'
//     }
//     setMessages((prev) => [...prev, AiResult])
//     setLoading(false)
//   }

//   const onGenerate = async (input) => {
//     const msg = {
//       role: 'user',
//       content: input
//     }
//     setMessages((prev) => [...prev, msg])
//     await UpdateWorkspace({
//       workspaceId: workspaceId,
//       messages: [...messages, msg]
//     })
//     setPrompt("")
//   }

//   useEffect(() => {
//     if (messages?.length > 0 && messages[messages.length - 1].role === 'user') {
//       GetAiResponse();
//     }
//   }, [messages])

//   // Voice Recognition Setup
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognition = new SpeechRecognition();
//         recognition.continuous = false;
//         recognition.lang = 'en-US';
//         recognition.interimResults = false;

//         recognition.onresult = (event) => {
//           const transcript = event.results[0][0].transcript;
//           setPrompt((prev) => prev + " " + transcript);
//         };

//         recognition.onend = () => setListening(false);

//         if (listening) {
//           recognition.start();
//         } else {
//           recognition.stop();
//         }
//       }
//     }
//   }, [listening]);

//   return (
//     <div className='relative h-[85vh] flex flex-col p-2 gap-3'>
//       <div className='flex-1 gap-2 overflow-y-scroll pl-2 scrollbar-hide'>
//         {messages?.length > 0 && messages.map((message, index) => (
//           <div key={index} className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center leading-7'>
//             <ReactMarkDown className='flex flex-col'>{message.content}</ReactMarkDown>
//           </div>
//         ))}
//         {loading && <div className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center'><Loader2Icon className='animate-spin' /> Generating Response...</div>}
//       </div>

//       <div className='flex gap-2 items-end cursor-pointer'>
//         {user && <Image src={user?.image} alt='user' width={30} height={30} />}
//         <div className='p-5 rounded-xl w-full bg-gray-800' style={{ backgroundColor: "grey" }}>
//           <div className='flex gap-2'>
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md'
//               placeholder='What you want to build'
//             />
//             {prompt !== "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}
//             <button onClick={() => setListening(!listening)} className='p-2 rounded-full bg-gray-700'>
//               {listening ? <MicOff className='text-red-500' /> : <Mic className='text-green-500' />}
//             </button>
//           </div>
//           <div><Link className='w-7 h-5' /></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ChatView;

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











