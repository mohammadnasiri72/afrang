"use client";

import ResponsiveMenu from "./ResponsiveMenu";

const TestDropdown = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-[#d1182b] p-4">
        <ResponsiveMenu />
      </div>
      
      {/* محتوای تست برای اسکرول */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">تست Dropdown جدید</h1>
        
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-2">بخش {i + 1}</h2>
            <p className="text-gray-600">
              این یک متن تست است برای بررسی عملکرد dropdown جدید. 
              وقتی روی منوها hover می‌کنید، dropdown حرفه‌ای باید ظاهر بشه.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestDropdown; 