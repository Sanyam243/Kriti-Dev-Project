import React from 'react'
import CodeView from '../../../components/custom/CodeView'
import ChatView from '../../../components/custom/ChatView'

function Workspace() {
  return (
    <div className='p-400 w-half'>
    <div className='p-3 grid grid-cols-3 pr-5'>
    
    <div className='relative z-10'><ChatView /></div>
        
        <div className='col-span-2 relative z-0'>
        <CodeView/>
        </div>
        </div>
    </div>
  


  )
}

export default Workspace
