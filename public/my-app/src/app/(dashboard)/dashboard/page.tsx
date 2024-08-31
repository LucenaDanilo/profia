import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'


export default async function page() {
  return (
    <div className="bg-custom-gradient min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
        <Dash/>
      </div>
    </div>
  )
}

