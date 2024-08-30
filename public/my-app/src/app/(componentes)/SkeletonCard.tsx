import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className='w-[250px] h-[350px] lg:w-[330px] rounded-md md:w-[300px] bg-gray-200 p-2 md:p-4 border-[1px] flex flex-col justify-between border-blue-700 mt-6 md:mt-0 animate-pulse duration-1000'>
      <div className=''>
        <div className='w-full'>
          <div className='h-6 bg-gray-300 rounded mb-4'></div>
          <div className='flex items-center mb-2'>
            <div className='w-8 h-8 bg-gray-300 rounded-full mr-2'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
          <div className='flex items-center mb-2'>
            <div className='w-8 h-8 bg-gray-300 rounded-full mr-2'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
          <div className='h-4 bg-gray-300 rounded w-full'></div>
        </div>
        <div className='border-t-[1px]py-4 flex justify-between'>
          <div className='flex items-center'>
            <div className='w-6 h-6 bg-gray-300 rounded-full mr-2'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
          <div className='flex items-center'>
            <div className='h-4 bg-gray-300 rounded w-1/2'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
