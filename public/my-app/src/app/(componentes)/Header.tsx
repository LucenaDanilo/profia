"use client"
import React from 'react'
import Image from 'next/image'
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  return (
    <header className='bg-[#FDF7E4] w-full h-[80px]'>
        <div className='container mx-auto'>
            <div className='flex items-center justify-between'>
                <div className='pt-[10px]'>
                    <img src="https://i.pinimg.com/236x/66/b3/24/66b3247f3e0ed3fa5279221874f628ac.jpg" alt="profile image" width={60} height={60} className='rounded-[50%]'></img>
                </div>
                <div>
                    <nav>
                        <ul className='flex flex-row gap-4  items-center pt-[10px] '>
                            <div>
                                <li className='text-[#42204d] font-bold'>Danilo Lucena</li>
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