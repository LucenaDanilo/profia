"use client"
import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'
import { useSession } from 'next-auth/react'
function page() {
  const {data: session} = useSession();
  return (
    <div className="bg-custom-gradient min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
            <div className="p-6 bg-gradient-to-r from-blue-400 via-teal-500 to-yellow-500 rounded-lg shadow-lg text-white h-[245px] mx-auto mt-6">
              <h1 className="text-3xl font-bold mb-4">Olá, {session?.user.name}</h1>
              <h2 className="text-xl font-semibold mb-2">Esses são seus pontos: <span className="font-bold text-yellow-300">{session?.user.points}</span></h2>
              <h3 className="text-lg font-medium text-black">Consulte a coordenação para verificar como ganhar mais pontos</h3>
            </div>
      </div>
    </div>
  )
}

export default page