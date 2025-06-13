// import Lookup from '@/app/components/llm/Lookup'
"use client"
import React, { useContext } from 'react'
import Lookup from '../../components/llm/Lookup'
// import { UserContext } from '@/app/context/UserContext'
import PricingModel from '../../components/custom/PricingModel'
import { UserContext } from '../../context/UserContext'
// import { UserContext } from "../../context/UserContext";


function page() {
    const {user,setUser} =useContext(UserContext)
  return (
    <div className='mt-20 flex flex-col items-center w-full p-10 md:px-32 lg:px-48'>
     <h2 className='font-bold text-5xl'>Pricing</h2>
    <p className='text-gray-400 max-w-xl text-center mt-4'>{Lookup.PRICING_DESC}</p>
    <div className='p-5 border rounded-xl w-full flex justify-between mt-7 items-center' >
        <h2 className='text-lg'><span className='font-bold'>
           {user?.token} </span></h2>
           <div className=''>
            <h2 className='font-medium'>
                Need more tokens
            </h2>
            <p>Upgrade the Plan</p>
           </div>
    </div>
    <PricingModel />
    </div>
  )
}

export default page