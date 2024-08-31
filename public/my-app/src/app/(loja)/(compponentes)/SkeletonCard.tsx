import React from 'react'

function SkeletonProduct() {
  return (
    <div className='animate-pulse h-[330px] w-[260px] md:h-[330px] md:w-[290px] lg:h-[330px] lg:w-[340px] bg-[#28272B] flex flex-col rounded-md'>
        <div className='bg-[#FFA049] w-full flex justify-center h-[120px] rounded-t-md'>
                <div className='h-[100px] w-[120px] bg-[#FFA049]'></div>
            </div>
            <div className='flex flex-col mt-6 p-4'>
                <div className='h-[22px] bg-gray-600 rounded-md mb-2'></div>
                <div className='flex gap-1 items-center mb-2'>
                    <div className='h-[14px] w-[14px] bg-gray-500 rounded-full'></div>
                    <div className='h-[14px] w-[14px] bg-gray-500 rounded-full'></div>
                    <div className='h-[14px] w-[14px] bg-gray-500 rounded-full'></div>
                    <div className='h-[14px] w-[30px] bg-gray-500 rounded-md'></div>
                </div>
                <div className='flex justify-between p-4'>
                    <div className='h-[16px] w-[60px] bg-gray-600 rounded-md'></div>
                    <div className='h-[32px] w-[100px] bg-[#5fcdee] rounded-[20px]'></div>
                </div>
            </div>
    </div>
  )
}

export default SkeletonProduct

