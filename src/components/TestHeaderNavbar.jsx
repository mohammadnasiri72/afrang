"use client";

import HeaderNavbarWrapper from "./HeaderNavbarWrapper";

const TestHeaderNavbar = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderNavbarWrapper />
      
      {/* محتوای تست برای اسکرول */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">تست هدر و ناوبر</h1>
        
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">بخش {i + 1}</h2>
            <p className="text-gray-600">
              این یک متن تست است برای بررسی عملکرد هدر و ناوبر فیکس شده. 
              وقتی اسکرول می‌کنید، هدر و ناوبر باید در بالای صفحه فیکس بشن.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHeaderNavbar; 