import React from 'react';

const Loading = ({array}) => {
  return (
  array.map(item=>(
    <div className=" w-full max-w-5xl mx-auto my-4 p-4 border rounded-lg shadow-md flex flex-col items-center">
    {/* Question Section Skeleton */}
    <div className="mb-2">
      <h3 className="text-lg font-semibold text-gray-300 bg-gray-300 h-6 w-32 mb-1 rounded-md"></h3>
      <div className="bg-gray-200 h-4 w-64 rounded-md"></div>
    </div>

    {/* Bot Replied Skeleton */}
    <div className="mt-2">
      <h4 className="text-lg font-semibold text-blue-200 bg-green-200 h-6 w-36 mb-2 rounded-md"></h4>
      <div className='overflow-x-auto'>
        <div className="bg-gray-200 h-4 w-full rounded-md mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-full rounded-md mb-2 animate-pulse"></div>
        <div className="bg-gray-200 h-4 w-3/4 rounded-md animate-pulse"></div>
      </div>
    </div>
  </div>
  ))
  );
};

export default Loading;
