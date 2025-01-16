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
    <div className='flex p-2 items-center justify-between  bg-purple-950'>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
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
          <Button className='bg-purple-700 text-gray-300 rounded font-semibold px-2 hover:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>Sign In</Button>
         <Button className='bg-purple-700 text-gray-300 rounded font-semibold px-2 hover:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>Get Started</Button>
        </div>
        
      )}
    </div>
  )
}

export default Header
