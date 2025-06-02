import React from 'react';

const Loading = () => {
  return (
    <div className="space-y-8">
      {[...Array(2)].map((_, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-lg shadow-sm">
          {/* Category Header with Search */}
          <div className="border-b border-gray-100 p-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between">
              <div className="relative w-full md:w-64">
                <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="hidden md:block w-64"></div>
            </div>
          </div>

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-gray-50">
            <div className="col-span-7 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="col-span-3 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>

          {/* Product Items */}
          <div className="divide-y divide-gray-100">
            {[...Array(4)].map((_, itemIndex) => (
              <div key={itemIndex} className="p-4">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 sm:col-span-7">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="col-span-6 sm:col-span-2 flex justify-center">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="col-span-6 sm:col-span-3 flex justify-center">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading; 