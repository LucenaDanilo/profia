"use client"
import React from 'react'
import { PiExam } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { SiGoogleclassroom } from "react-icons/si";

import { RiRobot3Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaCoins } from "react-icons/fa";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useState } from 'react';

function Aside() {
  const currentPath = usePathname();
  const {data: session} = useSession();
  const id = session?.user.id

  const [open, setOpen] = useState(false);
  return (
    <div className=' min-h-screen'>
    <aside className={`bg-[#28272bf1] h-full border-r-2 border-white  flex flex-col gap-4 px-2 md:gap-0 md:px-0 items-center pt-4 ${open ? "w-72" : "w-24"} duration-300`}>
        <div className={` ${open ?'flex justify-between w-[80%]' : 'flex-col pb-2'} `}>
          <div className=''></div>
          <div className=''>
          <IoIosArrowDropleft 
            size={32} 
            color='whitesmoke' 
            className={`-right-0 top-9 rounded-full cursor-pointer hidden md:block ${!open && "rotate-180"}`} 
            onClick={() => setOpen(!open)}
          />
          </div>
        </div>
        <Link href="/dashboard"  className={`flex flex-col ${currentPath === "/dashboard" ? "bg-dark-purple-hover" :"" } ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <IoMdHome 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Home
          </div>
          
        </Link>
        <Link href="/products" className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} ${currentPath.startsWith("/products") ? "bg-dark-purple-hover" :"" } items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <FaShoppingCart 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Loja
          </div>
          
        </Link>
        <Link href="/coins" className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} ${currentPath === "/coins" ? "bg-dark-purple-hover" :"" } items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <FaCoins 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Coins
          </div>
          
        </Link>
        <Link href={`/turma/${id}`} className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} ${currentPath.startsWith("/turma" ) ? "bg-dark-purple-hover" :"" } items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <SiGoogleclassroom 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Turma
          </div>          
        </Link>
        <Link href="/historico" className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center ${currentPath === "/historico" ? "bg-dark-purple-hover" :"" } hover:bg-dark-purple-hover w-full`}>
          <div>
            <PiExam 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Histórico
          </div>          
        </Link>
        <Link href="/perfil" className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center ${currentPath === "/perfil" ? "bg-dark-purple-hover" :"" } hover:bg-dark-purple-hover w-full`}>
          <div>
            <RiRobot3Line 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Perfil
          </div>          
        </Link >
    </aside> 
    </div>
    
  )
}

export default Aside
