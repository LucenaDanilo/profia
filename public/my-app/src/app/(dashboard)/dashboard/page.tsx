import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import Dash from '@/app/(componentes)/Dash'

function page() {
  return (
      <>
        <div>
          <Header></Header>
        </div>
      <div className='container mx-auto h-[100%]'>
        <div className='flex '>
          <Aside></Aside>
          <Dash></Dash>
        </div>
      </div>
      </>
  )
}

export default page