import React from 'react'

function SkeletonAula() {
  return (
    <div className='flex-1 p-6 bg-custom-gradient'>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 animate-pulse">
        <div className='bg-[#e0eafc] w-full flex justify-center h-[120px] rounded-t-md'>
          <div className='h-[100px] w-[120px] bg-[#cfdef3]'></div>
        </div>
        <div className='flex flex-col mt-6 p-4'>
          <div className='h-[22px] bg-gray-600 rounded-md mb-4'></div>
          <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
          <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
          <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
          <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
          <div className='h-[16px] bg-gray-600 rounded-md mb-4'></div>
        </div>
        <div className="flex flex-col">
          <h2 className='h-[22px] bg-gray-600 rounded-md mb-4'></h2>
          <div className='flex flex-col'>
            <div className='bg-[#e0eafc] p-4 rounded-md mb-3 animate-pulse'>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
            </div>
            <div className='bg-[#e0eafc] p-4 rounded-md mb-3 animate-pulse'>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
            </div>
            <div className='bg-[#e0eafc] p-4 rounded-md mb-3 animate-pulse'>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
              <div className='h-[16px] bg-gray-600 rounded-md mb-2'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonAula
