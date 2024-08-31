import React from 'react'

function SkeletonDetails() {
  return (
    <div className='pt-2'>
  <div className="shadow-lg rounded-lg bg-[#1d1c1f] w-[400px] text-white flex flex-col gap-6">
    <div className='bg-[#5DBF79] rounded-t-lg animate-pulse'>
      <div className='w-full h-48 bg-green-400 rounded-t-lg'></div>
    </div>
    <div className='flex flex-col p-2 gap-2'>
      <div className='h-6 bg-gray-400 rounded w-3/4 animate-pulse'></div>
      <div className='flex gap-1 items-center'>
        <div className='h-6 bg-gray-400 rounded w-1/2 animate-pulse'></div>
        <div className='h-6 bg-gray-400 rounded w-1/4 animate-pulse'></div>
      </div>
      <div className='h-4 bg-gray-400 rounded w-3/4 animate-pulse'></div>
    </div>
    <div className='flex gap-1 items-center pl-2 pb-2'>
      {[...Array(5)].map((_, i) => (
        <div key={i} className='w-4 h-4 bg-gray-400 rounded-full animate-pulse'></div>
      ))}
      <div className='h-4 bg-gray-400 rounded w-12 animate-pulse'></div>
    </div>
    <div className='flex pl-2 pb-6'>
      <button className='flex p-2 items-center gap-2 bg-orange-400 rounded-[20px] w-3/4 animate-pulse'>
        <div className='w-6 h-6 bg-white rounded-full animate-pulse'></div>
        <div className='h-4 bg-white rounded w-1/2 animate-pulse'></div>
      </button>
    </div>
    <div className='flex gap-4 items-center p-2 bg-gray-400 rounded-b-lg'>
      <div className='w-8 h-8 bg-gray-400 rounded-full animate-pulse'></div>
      <div className='flex flex-col gap-1'>
        <div className='h-6 bg-white rounded w-16 animate-pulse'></div>
        <div className='h-4 bg-blue-400 rounded w-24 animate-pulse'></div>
      </div>
    </div>
  </div>
</div>

  )
}

export default SkeletonDetails