import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function page() {
  return (
      <>
      <div className='h-full bg-[#28272bf1] '>
        <div>
          <Header></Header>
        </div>
        
          <div className='flex min-h-full'>
            <Aside></Aside>
            <Dash></Dash>
          </div>
             
      </div>
      </>
  )
}

