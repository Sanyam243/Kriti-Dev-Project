"use client"
import { MessageContext } from '../../context/MessageContext'
import { UserContext } from '../../context/UserContext'
import { Link, ArrowRight } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import SignInPopUp from './SignInPopUp'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import FlipCard from './_components/flipCard'
import ImageOverlap from './_components/ImageOverlap'
import { useRouter } from 'next/navigation'
import {  Loader2Icon, Mic } from 'lucide-react'
import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({ subsets: ['latin'], weight: ['300', '400', '700'] });
import HighlightSection from './_components/contents'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '../../../components/ui/accordion.jsx'

function Hero() {


    const router =useRouter()
    const [prompt, setPrompt] = useState("")
    const examplePrompts = [
        { key: 1, prompt: 'Make a Course Selling Website' },
        { key: 2, prompt: 'Create a Todo App' },
        { key: 3, prompt: 'Make an E-Commerce Website' },
        { key: 4, prompt: 'Make a Weather App' },
        { key: 5, prompt: 'Create a Budget Track App' }
    ];

    const exampleQnA = [
      { key: 1, question: 'What is this platform about?', answer: 'This platform allows users to generate and manage content dynamically with an intuitive interface.' },
      { key: 2, question: 'What technologies power this platform?', answer: 'The platform is built using Next.js, React, Convex for backend operations, and Tailwind CSS for a modern UI.' },
      { key: 3, question: 'How is user authentication handled?', answer: 'Users can securely log in using OAuth authentication, with data stored safely in the backend.' },
      { key: 4, question: 'Can users interact with generated content?', answer: 'Yes, users can ask questions, generate responses dynamically, and save their queries for later reference.' },
      { key: 5, question: 'Is my data stored securely?', answer: 'Yes, all user data and generated content are stored securely with proper encryption and access control.' },
      { key: 6, question: 'Can I edit or update my profile?', answer: 'Yes, users can update their profile details, including name, profile picture, and phone number.' },
      { key: 7, question: 'Is this platform free to use?', answer: 'Currently, it is free to use, but some premium features may be introduced in the future.' }
  ];
  
    const { messages, setMessages } = useContext(MessageContext);
    const { user, setUser } = useContext(UserContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace)
    const [openDialog, setOpenDialog] = useState(false);
      const [isListening, setIsListening] = useState(false);
      const [recognition, setRecognition] = useState(null);

    const onGenerate = async (input) => {

        if (!user?.name) {
            setOpenDialog(true);
        }
        if(user?.token<10){
          toast("You don't have enough tokens to generate a response. Please upgrade your plan.")
          return;
          }
      
        setMessages({
            role: 'user',
            content: input
        })
        const msg ={
            role: 'user',
            content: input
        }
        const workspaceId = await CreateWorkspace({
            messages:[msg],
            user:user?._id
        })
        console.log(workspaceId)
        router.push('./workspace/'+workspaceId)

    }
    
    
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
        <>
            
            <div className='flex flex-col justify-center items-center w-full gap-3 mt-20'>
  <div className='text-6xl'>🚀</div> {/* Rocket emoji as an icon */}
  <h1 className='text-4xl text-center font-bold font-montserrat animate-bounce-in'>Bringing your vision to life.</h1>
  <h2 className='font-montserrat animate-fade-up'>Code, vibe, deploy, and flex your sites!</h2>


                <div className=' rounded-xl w-1/2 p-2 bg-gray-800'>
                    <div className='w-full flex'>

                        <textarea value={prompt} onChange={(e) => {
                            setPrompt(e.target.value)
                        }} className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md' placeholder='What you want to build' type="text-area"
                        />
                        {prompt != "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}

                    </div>
                    <div className='flex items-center gap-2'>
            <Mic className={`cursor-pointer w-6 h-6 ${isListening ? 'text-red-500' : 'text-white'}`} onClick={isListening ? stopListening : startListening} />
            {/* <Link className='w-7 h-5' /> */}
          </div>
                    {/* <div><Link className='w-7 h-5' /></div> */}
                </div>


                <div className='grid grid-cols-3 gap-3'>
                    {examplePrompts.map((Prompt) => (
                        <div key={Prompt.key} className='flex gap-1 border p-1 text-sm text-center justify-center items-center rounded-md cursor-pointer hover shadow-sm' onClick={() => onGenerate(Prompt.prompt)}>
                            {Prompt.prompt}
                        </div>

                    ))}
                </div>
                
               

                <SignInPopUp openDialog={openDialog} closeDialog={(v) => {
                    setOpenDialog(false)
                }} />

            </div>
       


<div className="flex flex-col items-center my-10">
  <h2 className="text-center text-2xl font-bold mb-2">ABOUT AI GENERATED WEBSITES</h2> 
  <div className="flex justify-center flex-wrap gap-4">
    <FlipCard
      title="AI-Empowerment"
      description="AI-Powered Content Generation"
      imageUrl="https://s25.postimg.cc/frbd9towf/cta-2.png"
      backContent="Discover how AI can assist in creating engaging content for your website"
    />
    <FlipCard
      title="Generative AI"
      description="Enhance User Engagement"
      imageUrl="https://s25.postimg.cc/hj4c4qnov/cta-3.png"
      backContent="Learn strategies to boost user interaction through personalized content."
    />
    <FlipCard
      title="Coding is Easy"
      description="Optimize Your Workflow"
      imageUrl="https://s25.postimg.cc/l2q9ujy4f/cta-4.png"
      backContent="Explore tools and techniques to streamline your content creation process."
    />
  </div>
</div>



            
                <HighlightSection/>
                <div className={`my-10 ml-60 mr-60 ${merriweather.className}`}>
    <h1 className='text-4xl font-extrabold italic text-indigo-700 tracking-wide'>
        Frequently Asked Questions
    </h1>
    {exampleQnA.map((entry) => (
        <Accordion key={entry.key} type="single" collapsible>
            <AccordionItem value={`item-${entry.key}`}>
                <AccordionTrigger className='text-lg font-semibold text-white-800 hover:text-red-600 transition-all duration-200'>
                    {entry.question}
                </AccordionTrigger>
                <AccordionContent className='text-md text-indigo-300 leading-relaxed'>
                    {entry.answer}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ))}
</div>
               
        </>
        
    )
}

export default Hero

