import { getImageUrl } from '@/utils/mainDomain';
import React from 'react'

function ListProductSec({ productsSec , setStepPage , loadingList}) {
  // اسکلتون لودینگ افقی با تیلویند
  const skeleton = Array(6).fill(0).map((_, i) => (
    <div key={i} className="relative flex items-center gap-4 bg-gray-200 rounded-xl p-3 w-full max-w-xs animate-pulse min-h-[80px]">
      <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
        <div className="h-3 w-1/2 bg-gray-300 rounded" />
      </div>
    </div>
  ));
  // SVG دوربین جایگزین
  const CameraSVG = (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="12" fill="#e0e0e0"/>
      <circle cx="24" cy="28" r="8" fill="#bdbdbd"/>
      <rect x="14" y="14" width="20" height="8" rx="2" fill="#bdbdbd"/>
      <rect x="20" y="10" width="8" height="4" rx="1" fill="#bdbdbd"/>
    </svg>
  );

  return (
   <>
   <div className="bg-gray-50 min-h-screen py-8">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-5xl mx-auto product-grid-responsive">
     {
        loadingList ? (
          skeleton
        ) : (
          productsSec.length > 0 ?
            productsSec.map((pr)=>(
              <div key={pr.id} className="relative flex items-center gap-4 bg-white rounded-xl shadow p-3 w-full max-w-xs min-h-[80px]">
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="cursor-pointer" title="حذف">🗑️</span>
                  <span className="cursor-pointer" title="جزئیات">🔍</span>
                </div>
                {pr.image ? (
                  <img src={getImageUrl(pr.image)} alt={pr.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-gray-100" />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-100">{CameraSVG}</div>
                )}
                <div className="flex flex-col flex-1 min-w-0 gap-1">
                  <span className="font-bold text-base truncate">{pr.title}</span>
                  <span className="text-gray-500 text-sm truncate">دسته‌بندی: {pr.categoryTitle}</span>
                  <span className="text-blue-600 font-bold text-sm">قیمت: {pr.price.toLocaleString()} تومان</span>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center text-gray-500 text-lg">محصولی یافت نشد.</div>
            )
        )
     }
     </div>
   </div>
   </>
  )
}

export default ListProductSec
