import React from 'react'
import Image from 'next/image'
import { Button } from '../button'

function Header() {
  return (
    <div className='flex p-3 items-center justify-between m-4'>
      <Image src={'/logo.png'} alt='logo' width={40} height={40}></Image>
      <div className='flex gap-3'>
        <Button>Sign In</Button>
        <Button>Get Started</Button>
      </div>
    </div>
  )
}

export default Header
