import React from 'react'
import Header from '@/app/(componentes)/Header'
import Aside from '@/app/(componentes)/Aside'
import UpdateExam from '@/app/(componentes)/UpdateExam'
function page() {
  return (
    <>
        <Header/>
        <div className='flex'>
        <Aside/>
        {/* <UpdateExam/> */}
        </div>
    </>
  )
}

export default page