import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className='w-[250px] h-[350px] lg:w-[330px] rounded-lg md:w-[300px] bg-[#2c2f3a] p-4 border border-[#1d1f22] shadow-lg flex flex-col justify-between mt-6 md:mt-0 animate-pulse rounde-'>
    <div className='flex flex-col h-full'>
      <div className='mb-4'>
        <div className='h-6 bg-[#3a3f4c] rounded-md w-3/4 mb-2'></div>
        <div className='flex items-center mb-1'>
          <div className='h-4 w-12 bg-[#5fcdee] rounded-md mr-2'></div>
          <div className='h-4 bg-[#3a3f4c] rounded-md w-1/2'></div>
        </div>
        <div className='flex items-center mb-1'>
          <div className='h-4 w-12 bg-[#5fcdee] rounded-md mr-2'></div>
          <div className='h-4 bg-[#3a3f4c] rounded-md w-1/2'></div>
        </div>
        <div className='h-4 bg-[#3a3f4c] rounded-md w-full mb-1'></div>
        <div className='h-4 bg-[#3a3f4c] rounded-md w-5/6'></div>
      </div>
      <div className='border-t border-gray-600 pt-4 flex justify-between text-gray-200'>
        <div className='flex items-center cursor-pointer'>
          <div className='h-4 w-12 bg-[#5fcdee] rounded-md mr-2'></div>
          <div className='h-4 bg-[#3a3f4c] rounded-md w-1/4'></div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SkeletonCard;
