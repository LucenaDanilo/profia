import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
function page() {
  return (
    <div>
        <Header/>
        <div className='flex'>
          <Aside/>
          <div>minhas moedas</div>
        </div>
    </div>
  )
}

export default page