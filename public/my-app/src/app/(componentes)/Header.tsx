"use client"
import React from 'react'
import Image from 'next/image'
import { IoLogOutOutline } from "react-icons/io5";
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const getEmailPrefix = (email: string | undefined) => {
        return email ? email.split('@')[0] : '';
    };

  return (
    <header className='bg-[#1e2b38] text-[#5fcdee]  w-full h-[70px] shadow-lg'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between px-4 md:px-0 py-2'>
                <div className='flex items-center  cursor-pointer' onClick={() => router.replace("/perfil")}>
                    <img 
                        src="/Robo.jpg" 
                        alt="profile image" 
                        width={50} 
                        height={50} 
                        className='rounded-full border-2 border-white'
                    />
                    <div className='ml-4'>
                        <h1 className='text-lg font-semibold'>{session?.user.name}</h1>
                        <p className='text-sm text-[#ffffffb7]'>{getEmailPrefix(session?.user.email)}</p>
                    </div>
                </div>
                <div>
                    <button 
                        onClick={() => signOut()} 
                        className='flex flex-col justify-center text-[#ffffffb7] hover:text-[#3a4140] transition-colors duration-300'
                    >
                        <IoLogOutOutline size={28} color='5fcdee'/>
                        <span className=' text-sm'>sair</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header;
