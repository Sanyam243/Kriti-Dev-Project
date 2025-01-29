"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useConvex } from 'convex/react';
import { UserContext } from '../../context/UserContext';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import { useSidebar } from '../../../components/ui/sidebar';
import {Loader2Icon} from 'lucide-react'

function WorkspaceHistory() {
     const {user,setUser} =useContext(UserContext)
     const convex = useConvex()
     const [workSpaceHistory,setWorkspaceHistory] =useState();
     const {toggleSidebar} =useSidebar()
     const [loading,setLoading] =useState(true)
     const GetAllWorkspace = async () => {
          setLoading(true)
         const result = await convex.query(api.workspace.GetAllWorkspace, {
           userId: user?._id
         })
         setWorkspaceHistory(result)
         setLoading(false)
        
       }

       useEffect(()=>{
        
        if(user){
            GetAllWorkspace()
        }
       },[user])
  return (
    <div>
      Workspace Chat History


{
  user?.name ?(<div className='flex flex-col p-3 gap-3'>


    {workSpaceHistory?.length>0 && workSpaceHistory.map((workspace,index)=>(
      <Link key={index} href={`workspace/${workspace._id}`} >
      <div onClick={toggleSidebar} className='p-2 border text-gray-400 shadow-sm text-sm hover:text-white cursor-pointer'>
        {workspace?.messages[0]?.content}
        </div>
        </Link>
    ))}
     {loading&& <div className='flex mb-3 gap-2 bg-slate-600 p-2 rounded-md items-center '> <Loader2Icon className='animate-spin'></Loader2Icon> Loading Chats....</div>}
  </div>):(
    <div>Login Please</div>
  )
}
      
    </div>
  )
}

export default WorkspaceHistory
