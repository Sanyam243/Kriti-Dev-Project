"use client"
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../../../components/ui/button'
import { UserContext } from '../../context/UserContext'

function Header() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <div className='flex p-2 items-center justify-between m-4'>
      <Image 
        onClick={handleLogoClick} 
        src={'/logo.png'} 
        alt='logo' 
        width={40} 
        height={40}
        className="cursor-pointer" 
      />
      {!user?.name && (
        <div className='flex gap-3'>
          <Button>Sign In</Button>
          <Button>Get Started</Button>
        </div>
      )}
    </div>
  )
}

export default Header
