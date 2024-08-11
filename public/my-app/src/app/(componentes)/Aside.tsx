"use client"
import React from 'react'
import { PiExam } from "react-icons/pi";
import { IoMdHome } from "react-icons/io";

import { SiGoogleclassroom } from "react-icons/si";

import { RiRobot3Line } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosArrowDropleft } from "react-icons/io";
import { FaCoins } from "react-icons/fa";


import { useState } from 'react';

function Aside() {
  const [open, setOpen] = useState(false);
  return (
    <div className=''>
    <aside className={`bg-dark-purple border-r-2 border-white h-screen flex flex-col gap-4 px-2 md:gap-0 md:px-0 items-center pt-4 ${open ? "w-72" : "w-24"} duration-300`}>
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
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <IoMdHome 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Home
          </div>
          
        </div>
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <FaShoppingCart 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Loja
          </div>
          
        </div>
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <FaCoins 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Coins
          </div>
          
        </div>
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <SiGoogleclassroom 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Turma
          </div>          
        </div>
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <PiExam 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Histórico
          </div>          
        </div>
        <div className={`flex flex-col  ${open ? 'md:flex-row md:py-[12px] md:pl-4': 'flex flex-col gap-2 py-2'} items-center  hover:bg-dark-purple-hover w-full`}>
          <div>
            <RiRobot3Line 
                size={24} 
                color='whitesmoke' />
            </div>
          <div className={`${open ? 'pl-4': 'text-center'} text-white`}>
            Perfil
          </div>          
        </div>
    </aside>
  </div>
      
    
  )
}

export default Aside
