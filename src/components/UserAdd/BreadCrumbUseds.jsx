import { Breadcrumb } from 'antd'
import Link from 'next/link';
import React from 'react'

function BreadCrumbUseds() {

    const breadcrumbItems = [
    {
      title: (
        <Link href="/" className="text-gray-500 hover:text-[#d1182b] font-[Yekan]">
          خانه
        </Link>
      ),
    },
    {
      title: (
       <span className="text-[#d1182b] font-[Yekan]">کالای دسته دوم</span>
      ),
    },
    
  ];
  return (
    <div className="bg-white py-4 px-5 rounded-lg xl:px-16">
      <Breadcrumb
        items={breadcrumbItems}
        separator={<span className="text-gray-400 mx-2 text-xs font-[Yekan]">&gt;</span>}
        className="font-[Yekan]"
      />
    </div>
  )
}

export default BreadCrumbUseds
