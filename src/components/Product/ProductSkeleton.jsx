"use client";

import { Skeleton } from "antd";

export function TitleProductSkeleton() {
  return (
    <div className="flex flex-wrap bg-white rounded-lg p-2 z-50 relative">
      {/* اسکلتون اسلایدر */}
      <div className="lg:w-1/3 w-full p-2">
        <div className="flex justify-between">
          <div className="w-1/6 mx-auto flex flex-col items-center justify-start">
            <Skeleton.Button active size="large" shape="circle" className="!w-12 !h-12" />
          </div>
          <div className="w-5/6 mx-auto">
            <Skeleton.Image active className="!w-full !h-[400px]" />
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton.Image key={item} active className="!w-full !h-20" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* اسکلتون توضیحات محصول */}
      <div className="lg:w-5/12 w-full p-2">
        <div className="px-3">
          <Skeleton.Input active block className="!h-8 !w-3/4 mb-4" />
          <Skeleton active paragraph={{ rows: 3 }} />
          <div className="mt-6">
            <Skeleton.Input active block className="!h-12 !w-full" />
          </div>
          <div className="mt-4">
            <Skeleton.Input active block className="!h-12 !w-full" />
          </div>
        </div>
      </div>

      {/* اسکلتون سبد خرید */}
      <div className="lg:w-1/4 w-full p-2">
        <div className="bg-[#f9f9f9] h-full rounded-lg p-7">
          <Skeleton.Input active block className="!h-6 !w-1/3 mb-4" />
          <Skeleton.Input active block className="!h-12 !w-full mb-4" />
          <Skeleton.Input active block className="!h-12 !w-full mb-4" />
          <Skeleton.Input active block className="!h-12 !w-full mb-4" />
          <div className="flex items-center gap-3 mt-6">
            <Skeleton.Button active size="small" shape="circle" className="!w-6 !h-6" />
            <Skeleton.Input active block className="!h-4 !w-1/2" />
          </div>
          <div className="flex items-center gap-3 mt-6">
            <Skeleton.Button active size="small" shape="circle" className="!w-6 !h-6" />
            <Skeleton.Input active block className="!h-4 !w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function BodyProductSkeleton() {
  return (
    <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative">
      {/* اسکلتون تب‌ها */}
      <div className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5">
        <div className="w-full flex gap-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton.Button key={item} active block className="!h-12 !flex-1" />
          ))}
        </div>
      </div>

      {/* اسکلتون محتوای تب */}
      <div className="w-full p-5">
        <Skeleton active paragraph={{ rows: 4 }} />
        <div className="mt-6">
          <Skeleton.Image active className="!w-full !h-64" />
        </div>
        <div className="mt-6">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>

      {/* اسکلتون محصولات مرتبط */}
      <div className="w-full mt-8">
        <div className="sm:px-4">
          <div className="flex justify-between items-center">
            <Skeleton.Input active block className="!h-8 !w-48" />
          </div>
        </div>
        <div className="flex flex-wrap md:-mt-3 w-full mt-5">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="md:w-1/3 lg:w-1/4 w-full">
              <div className="w-full p-3 relative h-full">
                <div className="relative rounded-lg overflow-hidden shadow-lg border border-[#0001] h-full flex flex-col">
                  <Skeleton.Image active className="!w-full !h-48" />
                  <div className="p-3">
                    <Skeleton active paragraph={{ rows: 2 }} />
                    <div className="mt-3">
                      <Skeleton.Button active block />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 