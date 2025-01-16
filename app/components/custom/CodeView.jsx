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

function CodeView() {

  const { messages, setMessages } = useContext(MessageContext);
  const [selectSection , setSelectSection] = useState('preview');
  const [files, setFiles] = useState(data?.DEFAULT_FILE || {});

  useEffect(() => {
    if (messages?.length > 0) {
    
      const role = messages[messages.length - 1].role
      if (role == 'user') {
        generateWesbsiteCode();
      }
    }

  }, [messages])
 
  const generateWesbsiteCode = async () => {
    try {
        const AiPrompt = messages[messages.length - 1].content + " " + Prompt.CODE_GEN_PROMPT;
       
       
        const response = await axios.post('/api/website-code', {
            prompt: AiPrompt
        });

        console.log(response.data);
       
        if (response.data) {
          const Result = response.data;
          const FileStructure = {...data.DEFAULT_FILE,...Result?.files}
            setFiles(FileStructure); 
        }
    } catch (error) {
        console.error('Error cause on generating website', error.response?.data || error.message);
    }
};


  
  return (
    <div>
      <div className ="bg-[#181818] w-full p-2 border">
        <div className='flex items-center rounded-full w-[140px] gap-3  shrink-0 bg-black p-1 justify-center  justify-center'>
          <h2 onClick={()=>setSelectSection('code')}
          className={`text-sm cursor-pointer ${selectSection=='code' && 'text-blue-500 bg-blue-500 bg-opacity-15 p-1 px-2 rounded-full'}`}>
            Code
          </h2>
          <h2 onClick={()=>setSelectSection('preview')}
           className={`text-sm cursor-pointer ${selectSection=='preview' && 'text-blue-500 bg-blue-500 bg-opacity-15 p-1 px-2 rounded-full'}`}>
Preview
          </h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={'dark'}  customSetup={{
       dependencies:{
        ...data.DEPENDANCY
       }
       
      }}files={files} options={{externalResources:['https://cdn.tailwindcss.com']}}>
    <SandpackLayout>
     {selectSection=='code'? <>
      <SandpackFileExplorer style={{height:'80vh'}}/>
      <SandpackCodeEditor style={{height:'80vh'}}/>
      </>:
      <>
      <SandpackPreview style={{height:'80vh'}} showNavigator={true}/>
      </>}
      
  
    </SandpackLayout>
  </SandpackProvider>
    </div>
  )
}

export default CodeView

