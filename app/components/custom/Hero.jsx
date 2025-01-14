"use client"
import { MessageContext } from '../../context/MessageContext'
import { UserContext } from '../../context/UserContext'
import { Link, ArrowRight } from 'lucide-react'
import React, { useContext } from 'react'
import { useState } from 'react'
import SignInPopUp from './SignInPopUp'

function Hero() {
    const [prompt, setPrompt] = useState("")
    const examplePrompts = [
        'Make a Course Selling Website',
        'Create a Todo App',
        'Make a E-Commerece Website',
        'Make a Weather App',
        'Create a Budget Track App'


    ]
    const { messages, setMessages } = useContext(MessageContext);
    const { user, setUser } = useContext(UserContext);
    const [openDialog, setOpenDialog] = useState(false);

    const onGenerate = (input) => {

        if (!user?.name) {
            setOpenDialog(true);
        }
        setMessages({
            role: 'user',
            content: input
        })

    }
    return (
        <div className='flex flex-col justify-center items-center gap-3 mt-40 '>
            <h1 className='text-4xl text-center font-bold'>What you want to build ?</h1>
            <h2>Prompt run, deploy,edit and make websites</h2>

            <div className=' rounded-xl w-1/2 p-2 bg-gray-800'>
                <div className='w-full flex'>

                    <textarea value={prompt} onChange={(e) => {
                        setPrompt(e.target.value)
                    }} className='bg-gray-800 outline-none w-full h-40 p-2 rounded-md' placeholder='What you want to build' type="text-area"
                    />
                    {prompt != "" && <ArrowRight className='bg-blue-500 p-2 w-10 h-8 cursor-pointer text-white' onClick={() => onGenerate(prompt)} />}

                </div>
                <div><Link className='w-7 h-5' /></div>
            </div>


            <div className='grid grid-cols-3 gap-3'>
                {examplePrompts.map((prompt, index) => (
                    <div className='flex gap-1 border p-1 text-sm text-center items-center rounded-md cursor-pointer hover shadow-sm' onClick={() => onGenerate(prompt)}>
                        {prompt}
                    </div>

                ))}
            </div>

            <SignInPopUp openDialog={openDialog} closeDialog={(v) => {
                setOpenDialog(false)
            }} />



        </div>
    )
}

export default Hero
