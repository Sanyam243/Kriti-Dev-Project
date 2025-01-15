import React from 'react'
import CodeView from '../../../components/custom/CodeView'
import ChatView from '../../../components/custom/ChatView'
function Workspace() {
  return (
    <div className='p-3 grid grid-cols-3'>
        <ChatView />
        <div className='col-span-2'>
        <CodeView/>
        </div>
      
    </div>
  )
}

export default Workspace
