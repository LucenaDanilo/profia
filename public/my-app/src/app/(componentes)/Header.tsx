"use client"
import React from 'react'
import Image from 'next/image'
import { IoLogOutOutline } from "react-icons/io5";
import customSession from '../customHooks/customSession';

function Header() {
    const {sessionHook} = customSession();
    
  return (
    <header className='bg-[#d4d2cb] text-black w-full h-[80px]'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between px-[10px] md:p-0'>
                <div className='pt-[10px]'>
                    <img src="https://i.pinimg.com/236x/66/b3/24/66b3247f3e0ed3fa5279221874f628ac.jpg" alt="profile image" width={60} height={60} className='rounded-[50%]'></img>
                </div>
                <div>
                    <nav>
                        <ul className='flex flex-row gap-4  items-center pt-[10px] '>
                            <div>
                                <li className='font-bold'>aq: {sessionHook?.user.email}</li>
                                <li className='font-medium'>Professor</li>
                            </div>
                            <div>
                                <button onClick={() => {console.log('saindo')}}>
                                    <IoLogOutOutline size={28} />

                                </button>
                            </div>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header