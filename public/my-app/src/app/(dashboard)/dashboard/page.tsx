import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'

export default async function page() {
  
  return (
    <div className="custom-back min-h-screen">
      <Header />
      <div className="flex min-h-screen">
        <Aside />
        <Dash/>
      </div>
    </div>
  )
}

