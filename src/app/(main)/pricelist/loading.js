'use client';

import { Skeleton } from 'antd';

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <Skeleton.Button active size="small" shape="circle" />
        <Skeleton.Input active size="large" style={{ width: '200px' }} />
        <Skeleton.Button active size="small" shape="circle" />
      </div>

      {/* Categories Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Container Skeleton */}
            <div className="relative h-32 w-full bg-gray-100 flex items-center justify-center">
              <Skeleton.Image active className="w-16 h-16" />
            </div>
            {/* Title Skeleton */}
            <div className="p-4">
              <Skeleton.Input active block size="large" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading; 