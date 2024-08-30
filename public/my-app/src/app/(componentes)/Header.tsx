"use client"
import React from 'react'
import Image from 'next/image'
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

function Header() {
    const { data: session } = useSession();
    
    const getEmailPrefix = (email: string | undefined) => {
        return email ? email.split('@')[0] : '';
    };

  return (
    <header className='bg-[#5fcdee] text-black w-full h-[70px] shadow-md'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between px-4 md:px-0 py-2'>
                <div className='flex items-center'>
                    <img 
                        src="/Robo.jpg" 
                        alt="profile image" 
                        width={50} 
                        height={50} 
                        className='rounded-full border-2 border-white'
                    />
                    <div className='ml-4'>
                        <h1 className='text-lg font-semibold'>{session?.user.name}</h1>
                        <p className='text-sm text-gray-800'>{getEmailPrefix(session?.user.email)}</p>
                    </div>
                </div>
                <div>
                    <button 
                        onClick={() => signOut()} 
                        className='flex items-center text-black hover:text-[#3a4140] transition-colors duration-300'
                    >
                        <IoLogOutOutline size={28} />
                        <span className='ml-2 text-sm'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;
