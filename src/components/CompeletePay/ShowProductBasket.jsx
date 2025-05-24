import { getImageUrl } from "@/utils/mainDomain";
import { BsArchive } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

function ShowProductBasket({items}) {
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3Eتصویر محصول%3C/text%3E%3C/svg%3E";
console.log(items);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm z-50 relative">
      <div className="flex items-center gap-2 mb-3">
        <FaShoppingCart className="text-lg text-[#d1182b]" />
        <h2 className="text-lg font-medium text-gray-800">اقلام سفارش</h2>
      </div>
      <div className="w-full space-y-3">
        {items?.map((item) => (
          <div
            key={item.id}
            className="w-full p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200"
          >
            <div className="flex items-start gap-3 w-full">
              <Link href={item.url} className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-1 hover:opacity-80 transition-opacity">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title || "تصویر محصول"}
                  className="w-full h-full object-contain rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-[#d1182b] text-white text-xs font-medium px-2 py-0.5 rounded-full">
                  {item.quantity} عدد
                </div>
              </Link>
              <div className="flex-1">
                <Link href={item.url} className="block hover:text-[#d1182b] transition-colors">
                  <h3 className="text-base text-gray-800 mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
                <div className="space-y-2">
                  {item.warranty && (
                    <div className="flex items-center text-sm text-gray-500">
                      <BsArchive className="ml-1.5" />
                      <span>{item.warranty}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {item.discount !== 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through">
                          {item.price1.toLocaleString()}
                        </span>
                        <span className="bg-[#d1182b] text-white text-xs px-2 py-0.5 rounded-full">
                          {item.discount}٪ تخفیف
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-base text-[#d1182b]">
                        {item.finalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">تومان</span>
                    </div>
                    <div className="text-sm text-gray-800">
                      قیمت کل: {(item.finalPrice * item.quantity).toLocaleString()} تومان
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowProductBasket;
