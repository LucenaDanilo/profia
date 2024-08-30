import React from 'react'

function SkeletonCard() {
    return (
        <div className="p-4 w-full md:w-1/3 bg-[#093248] rounded-lg animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 blur-sm"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 blur-sm"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-4 blur-sm"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 blur-sm"></div>
        </div>
      );
}

export default SkeletonCard