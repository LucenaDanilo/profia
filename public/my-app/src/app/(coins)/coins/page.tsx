"use client"
import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'

function page() {
  return (
    <div className="bg-[#28272bf1] min-h-screen">
      <Header />
      <div className="flex h-full">
        <Aside />
        <Dash/>
      </div>
    </div>
  )
}

export default page