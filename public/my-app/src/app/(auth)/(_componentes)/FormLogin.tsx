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
    <div className=''  style={{
      backgroundImage: "url('/wave.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center bottom -20vh",
      backgroundSize: "100% auto"
    }} >
    <div className='flex items-center justify-center h-screen px-4 py-8 md:px-8 lg:px-12'>
      <div className='flex flex-col md:flex-row items-center justify-center  rounded-3xl shadow-lg w-full md:w-3/4 lg:w-3/4 lg:h-3/4 border border-white border-[3px]'>
        <div className='hidden md:flex w-full md:w-1/2 lg:w-2/5 items-center justify-center'>
          <Image src="/newrobo.png" width={400} height={400} alt="Imagem da Profia" className='rounded-lg ' />
        </div>
        <div className='flex flex-col items-center justify-center w-full md:w-1/2 lg:w-3/5 px-4 py-6 md:py-8  h-full rounded-tr-3xl rounded-br-3xl'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md '>
            <h2 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
              Portal do Aluno Profia
            </h2>
          </div>
          <div className='mt-6 w-full sm:max-w-md '>
            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div>
                <label htmlFor="email" className='block text-sm font-medium text-white'>Email</label>
                <div className='mt-2'>
                  <input
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="block w-full rounded-md border-0 pl-2  py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className='relative'>
                <label htmlFor="password" className='block text-sm font-medium text-white'>Senha</label>
                <div className='mt-2'>
                  <input
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full rounded-md border-0 pl-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute top-[39px] right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800'>
                    {showPassword ? <FaRegEye className="h-5 w-5" fill='#666565' /> : <FaRegEyeSlash className="h-5 w-5" fill='#666565' />}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <Link href="/login" className='text-sm text-white hover:text-indigo-400'>
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
      </div>
    </div>
    </div>
  )
}

export default LoginForm
