import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#f6f6f6] overflow-hidden py-20">
      <div className="xl:px-16">
        <div className="bg-white rounded-lg p-8 text-center max-w-2xl mx-auto">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            محصول مورد نظر یافت نشد
          </h1>
          <p className="text-gray-600 mb-6">
            متأسفانه محصولی با این مشخصات در سیستم وجود ندارد.
          </p>
          
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-6">
            <p className="mb-2">ممکن است:</p>
            <ul className="text-right space-y-1">
              <li>• محصول مورد نظر حذف شده باشد</li>
              <li>• آدرس وارد شده اشتباه باشد</li>
              <li>• محصول در دسترس عموم نباشد</li>
              <li>• مشکلی در سیستم پیش آمده باشد</li>
            </ul>
          </div>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/products" 
              className="bg-[#d1182b] !text-white px-6 py-3 rounded-lg hover:bg-[#b31414] transition-colors"
            >
              مشاهده سایر محصولات
            </Link>
            <Link 
              href="/" 
              className="bg-gray-500 !text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>اگر مطمئن هستید که این محصول باید وجود داشته باشد، لطفاً با پشتیبانی تماس بگیرید.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
