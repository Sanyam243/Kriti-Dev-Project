"use client"
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MessageContext } from '../../context/MessageContext'
import Prompt from '../llm/Prompt'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import data from '../../../additional/data'
import { Loader2Icon } from 'lucide-react'
import SandpackPreviewClient from './SandpackPreviewClient'
import { ActionContext } from '../../context/ActionContext'
import { UserContext } from '../../context/UserContext'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { countToken } from './ChatView'

function CodeView() {
  const { user, setUser } = useContext(UserContext)
  const { messages, setMessages } = useContext(MessageContext);
  const [selectSection, setSelectSection] = useState('code');
  const [files, setFiles] = useState(data?.DEFAULT_FILE || {});
  const [loading, setLoading] = useState(false);
  const {action ,setAction} = useContext(ActionContext);
const UpdateToken=useMutation(api.user.UpdateToken);



  useEffect(() => {
    if (messages?.length > 0) {

      const role = messages[messages.length - 1].role
      if (role == 'user') {
        generateWesbsiteCode();
      }
    }

  }, [messages])

useEffect(()=>{
setSelectSection('preview');
},[action])


  const generateWesbsiteCode = async () => {


    try {
      setLoading(true);
      const AiPrompt = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;


      const response = await axios.post('/api/website-code', {
        prompt: AiPrompt
      });

      //console.log(response.data);

      if (response.data) {
        const Result = response.data;
        const FileStructure = { ...data.DEFAULT_FILE, ...Result?.files }
        setFiles(FileStructure);
        const token= Number(user?.token)-Number(countToken(JSON.stringify(Result)))
        setUser((prev) => ({ ...prev, token: token }))
        await UpdateToken({
          userId:user?._id,
          token:token
        })
      }

      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error cause on generating website', error.response?.data || error.message);
    }
  };



  return (
    <div className='relative'>
      <div className="bg-[#181818] w-full p-2 border">
        <div className='flex items-center rounded-full w-[140px] gap-3  shrink-0 bg-black p-1 justify-center  justify-center'>
          <h2 onClick={() => setSelectSection('code')}
            className={`text-sm cursor-pointer ${selectSection == 'code' && 'text-blue-500 bg-blue-500 bg-opacity-15 p-1 px-2 rounded-full'}`}>
            Code
          </h2>
          <h2 onClick={() => setSelectSection('preview')}
            className={`text-sm cursor-pointer ${selectSection == 'preview' && 'text-blue-500 bg-blue-500 bg-opacity-15 p-1 px-2 rounded-full'}`}>
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={'dark'} customSetup={{
        dependencies: {
          ...data.DEPENDANCY
        }

      }} files={files} options={{ externalResources: ['https://cdn.tailwindcss.com'] }}>
        <SandpackLayout>
          {selectSection == 'code' ? <>
            <SandpackFileExplorer style={{ height: '80vh' }} />
            <SandpackCodeEditor style={{ height: '80vh' }} />
          </> :
            <>
<SandpackPreviewClient/>
            </>}


        </SandpackLayout>
      </SandpackProvider>

      {loading && <div className=' flex w-full h-full bg-gray-900 opacity-50 absolute top-0 justify-center text-center items-center p-10 '>
        <Loader2Icon className='animate-spin text-white h-8 w-8' />
        <h2 className='text-white'>Generating your files.....</h2>
      </div>}
    </div>
  )
}

export default CodeView

