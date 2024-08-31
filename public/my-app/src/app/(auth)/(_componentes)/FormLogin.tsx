"use client"
import React, { useState, SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setError(null) 
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (result?.error) {
      setError('Dados incorretos. Por favor, verifique suas credenciais.')
      return
    }
    router.replace('/dashboard')
  }

  return (
    <div className='flex flex-col items-center justify-center px-2 py-4 md:px-6 md:py-12 lg:px-8 text-black'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center'>
        <Image src="/Robo.jpg" width={56} height={56} alt="imagem da profia" className='rounded-full' />
        <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Portal do Aluno Profia
        </h2>
      </div>
      <div className='mt-6 sm:w-full sm:max-w-sm'>
        {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-900'>Email</label>
            <div className='mt-2'>
              <input
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className='relative'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-900'>Senha</label>
            <div className='mt-2'>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute top-[33px] right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800'>
                {showPassword ? <FaRegEye className="h-5 w-5" fill='#666565'/> : <FaRegEyeSlash className="h-5 w-5" fill='#666565'/>}
              </button>
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <Link href="/login" className='text-sm text-[#093248] hover:text-indigo-400'>
              Esqueceu sua senha?
            </Link>
          </div>

          <div>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-[#093248] text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors'>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
