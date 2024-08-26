"use client"
import React from 'react'
import Image from 'next/image'
import { IoLogOutOutline } from "react-icons/io5";
import customSession from '../customHooks/customSession';
import { signOut } from 'next-auth/react';

function Header() {
    const {sessionHook} = customSession();
    
  return (
    <header className='bg-[#243364e5] text-white w-full h-[60px]'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between px-[10px] md:p-0'>
                <div className='pt-[4px]'>
                    <img src="https://i.pinimg.com/236x/66/b3/24/66b3247f3e0ed3fa5279221874f628ac.jpg" alt="profile image" width={50} height={50} className='rounded-[50%]'></img>
                </div>
                <div>
                    <nav>
                        <ul className='flex flex-row gap-4  items-center pt-[10px] '>
                            <div>
                                <li className='font-bold'>{sessionHook?.user.email.split('@')[0]}</li>
                                <li className='font-medium'>{}</li>
                            </div>
                            <div>
                                <button onClick={() => signOut()}>
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