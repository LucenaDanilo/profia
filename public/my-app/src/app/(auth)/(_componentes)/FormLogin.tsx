"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, SyntheticEvent } from 'react'
import { useRouter } from 'next/navigation'
import SocialLoginGithub from './SocialLoginGithub'
import { signIn } from 'next-auth/react'

function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [userType, setUserType] = useState<string>('')
  const [password, setPassword] = useState<string>('')


  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent){
    event.preventDefault()
    const result = await signIn('credentials',{
      email,
      userType,
      password,
      redirect: false
    })
    if(result?.error){
      alert('dados incorretos')
      return 
    }
    router.replace('/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center  px-2 py-4 md:px-6 md:py-12 lg:px-8 text-black'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'> 
          <Image src="/Robo.jpg" width={56} height={56} alt="imagem da profia" className='rounded-[50%]'/>
          <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Sign in to your account</h2>
      </div>
      <div className='mt-4'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='w-[320px] md:w-[400px]'>
            <label htmlFor="email" className='block text-sm font-medium leading-4 text-gray-900'>Email</label>
            <div className='mt-2'>
                <input id="email" name="email" onChange={(e) => setEmail(e.target.value)} type="email"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div className='w-[320px] md:w-[400px]'>
            <label htmlFor="userType" className='block text-sm font-medium leading-4 text-gray-900'>UserType</label>
            <div className='mt-2'>
                <input id="userType" onChange={(e) => setUserType(e.target.value)}  name="userType" type="text"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
          <div>
            <label htmlFor="senha" className='block text-sm font-medium leading-4 text-gray-900'>Senha</label>
            <div className='mt-2'>
                <input id="password"  onChange={(e) => setPassword(e.target.value)} name="password" type="password"  required className="block w-full rounded-md border-0 pl-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                <a href="" className='text-blue-700 hover:text-blue-400'>Esqueceu sua senha ?</a>
            </div>
          </div>
          <div>
            <button type='submit'>Entrar</button>
          </div>
          <div className='flex justify-center '>
            <div className='border border-black p-2 rounded-md text-black font-medium hover:cursor-pointer hover:bg-[#ffffff85]'>
            <Link href="/login">Criar conta</Link>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='flex items-center justify-center w-full'>
            <div className='bg-black w-[48%] h-[0.2px]'></div><span className='px-2'>or</span><div className='bg-black w-[48%] h-[0.2px]'></div>
            </div>
          </div>
          <SocialLoginGithub/>
        </form>
        
      </div>
    </div>
  )
}

export default LoginForm