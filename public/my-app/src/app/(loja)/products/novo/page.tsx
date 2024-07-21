"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

function page() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('new product')
    }
  return (
    <div>
        <div className='flex flex-col items-center justify-center  px-2 py-4 md:px-6 md:py-12 lg:px-8 text-black'>
            <div className='border-2 rounded-md border-white p-4'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'> 
                <Image src="/Robo.jpg" width={56} height={56} alt="imagem da profia" className='rounded-[50%]'/>
                <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Cadastrar novo produto</h2>
            </div>
        <div className='mt-4'>
            <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='w-[320px] md:w-[400px]'>
                <label htmlFor="email" className='block text-sm font-medium leading-4 text-gray-900'>Nome</label>
                <div className='mt-2'>
                    <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className='w-[320px] md:w-[400px]'>
                <label htmlFor="email" className='block text-sm font-medium leading-4 text-gray-900'>Preço</label>
                <div className='mt-2'>
                    <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className='w-[320px] md:w-[400px]'>
                <label htmlFor="email" className='block text-sm font-medium leading-4 text-gray-900'>urlImg</label>
                <div className='mt-2'>
                    <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            <div className='w-[320px] md:w-[400px]'>
                <label htmlFor="email" className='block text-sm font-medium leading-4 text-gray-900'>Descrição</label>
                <div className='mt-2'>
                    <input id="email" name="email" type="email"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
            </div>
            
            <div className='flex items-center justify-center '>
                <button type='submit' className='bg-green-600 cursor-pointer rounded-md hover:bg-green-700 p-2 text-white font-normal'>Criar novo produto</button>
            </div>
            <div className='flex justify-center '>
                <div className='border border-red-700 p-2 rounded-md text-black font-medium hover:cursor-pointer hover:bg-[#ffffff85]'>
                <Link href="/products">Cancelar</Link>
                </div>
            </div>        
            </form>
            
        </div>
        </div>
        </div>
    </div>
  )
}

export default page