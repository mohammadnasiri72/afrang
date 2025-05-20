import { getImageUrl } from "@/utils/mainDomain";
import { BsArchive } from "react-icons/bs";

function ShowProductBasket({items}) {
  const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3Eتصویر محصول%3C/text%3E%3C/svg%3E";

  

  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b pb-3">
        <h2 className="text-2xl font-bold text-gray-800">اقلام سفارش</h2>
      </div>
      <div className="w-full space-y-3">
        {items?.map((item) => (
          <div
            key={item.id}
            className="w-full p-3 rounded-lg border border-gray-100 hover:border-blue-300 transition-all duration-300"
          >
            <div className="flex items-start gap-3 w-full">
              <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded-lg p-1 shadow-sm">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title || "تصویر محصول"}
                  className="w-full h-full object-contain rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                  {item.quantity} عدد
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base text-gray-800 mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <div className="space-y-2">
                  {item.warranty && (
                    <div className="flex items-center text-sm text-gray-600">
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
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.discount}٪ تخفیف
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-base text-gray-800">
                        {item.finalPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">تومان</span>
                    </div>
                    <div className="text-sm font-bold text-gray-800">
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
