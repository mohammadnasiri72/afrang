import { getImageUrl } from "@/utils/mainDomain";
import { BsArchive } from "react-icons/bs";
import { FaShoppingCart, FaRecycle } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";

function buildTree(items) {
  const itemMap = {};
  
  // ایجاد یک مپ برای دسترسی سریع با کلید منحصر به فرد
  items.forEach((item) => {
    const uniqueKey = `${item.productId}_${item.colorId}`;
    itemMap[uniqueKey] = { ...item, children: [] };
  });

  const tree = [];
  items.forEach((item) => {
    const uniqueKey = `${item.productId}_${item.colorId}`;
    
    if (item.parentId === -1) {
      tree.push(itemMap[uniqueKey]);
    } else {
      // پیدا کردن والد بر اساس productId بدون در نظر گرفتن colorId
      const parentEntries = Object.entries(itemMap).find(([key, value]) => 
        value.productId === item.parentId
      );
      
      if (parentEntries) {
        const parentKey = parentEntries[0];
        itemMap[parentKey].children.push(itemMap[uniqueKey]);
      }
    }
  });

  return tree;
}

function ShowProductBasket() {
  const { currentItems } = useSelector((state) => state.cart);
  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle'%3Eتصویر محصول%3C/text%3E%3C/svg%3E";
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm z-50 relative">
      <div className="flex items-center gap-2 mb-3">
        <FaShoppingCart className="text-lg text-[#d1182b]" />
        <h2 className="text-lg font-medium text-gray-800">اقلام سفارش</h2>
      </div>
      <div className="w-full space-y-3">
        {buildTree(currentItems)?.map((item) => (
          <div
            key={item.id}
            className="w-full rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200"
          >
            <div className="w-full p-3 rounded-lg border border-gray-200 hover:bg-[#fff5f5] hover:border-[#d1182b] transition-all duration-200">
              <div className="flex items-start gap-3 w-full">
                <Link href={item.url}>
                  <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-1 hover:opacity-80 transition-opacity">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title || "تصویر محصول"}
                      className="w-full h-full object-contain rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                    {item.discount !== 0 && (
                      <div className="absolute -top-2 -right-2 bg-[#d1182b] !text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.discount}٪
                      </div>
                    )}
                    <div className="absolute -bottom-2 left-0 right-0 bg-[#d1182b]/80 !text-white text-xs font-medium py-0.5 text-center rounded-b-md">
                      {item.quantity} عدد
                    </div>
                  </div>
                </Link>
                <div className="flex-1">
                  <Link href={item.url}>
                    <div className="block  transition-colors">
                      <h3 className="text-base font-bold text-gray-800 hover:text-[#d1182b] mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                  <div className="space-y-2">
                    {item.warranty && (
                      <div className="flex items-center text-sm text-gray-500">
                        <BsArchive className="ml-1.5" />
                        <span>{item.warranty}</span>
                      </div>
                    )}
                    {item.conditionId === 20 && (
                      <div className="flex items-center text-sm text-[#d1182b]">
                        <FaRecycle className="ml-1.5" />
                        <span className="font-semibold">کالای کارکرده</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col mt-2 space-y-1">
                    {item.discount !== 0 && (
                      <div className="text-sm text-gray-500 line-through">
                        {item.price1.toLocaleString()} تومان
                      </div>
                    )}
                    {item.quantity > 1 ? (
                      <>
                        <div className="text-base text-[#d1182b]">
                          {item.finalPrice.toLocaleString()} تومان
                        </div>
                        <div className="text-sm text-gray-800">
                          قیمت کل:{" "}
                          {(item.finalPrice * item.quantity).toLocaleString()}{" "}
                          تومان
                        </div>
                      </>
                    ) : (
                      <div className="text-base text-[#d1182b]">
                        {item.finalPrice.toLocaleString()} تومان
                      </div>
                    )}
                  </div>
                  <div className="sm:block hidden">
                    {item.children?.length > 0 && (
                      <>
                       
                        <div className="flex flex-wrap justify-start items-center mt-2">
                          {item.children.map((e) => (
                            <div
                              key={e.id}
                              className="lg:w-1/3 w-full lg:mt-0 mt-3"
                            >
                              <div className="flex gap-1">
                                <Link href={e.url}>
                                  <div className="relative w-14 h-14">
                                    <Image
                                      style={{ filter: " brightness(0.8)" }}
                                      className="w-full h-full object-contain rounded-lg"
                                      src={getImageUrl(e.image)}
                                      alt={e?.title}
                                      width={20}
                                      height={20}
                                      unoptimized
                                    />
                                    {e.discount !== 0 && (
                                      <span className="absolute top-2 right-0 bg-[#d1182baa] px-2 py-0.5 rounded-sm !text-white text-xs font-bold">
                                        {e.discount}٪
                                      </span>
                                    )}
                                  </div>
                                </Link>
                                <div className="flex flex-col items-start justify-between">
                                  <Link
                                    className="hover:text-[#d1182b] text-[#0009] duration-300 px-2 !text-justify"
                                    href={e.url}
                                  >
                                    <span className="text-xs font-bold line-clamp-2 ">
                                      {e?.title}
                                    </span>
                                  </Link>
                                  {e.showPrice && (
                                    <span className=" font-bold line-clamp-2 text-[#d1182b] whitespace-nowrap px-2">
                                      {e?.finalPrice.toLocaleString()}
                                      <span className="text-xs px-1">
                                        تومان
                                      </span>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
                <div className="sm:hidden block ">
                  {item.children?.length > 0 && (
                    <>
                      <div className="flex flex-wrap justify-between items-center mt-2">
                        {item.children.map((e) => (
                          <div
                            key={e.id}
                            className="lg:w-1/3 w-full lg:mt-0 mt-3"
                          >
                            <div className="flex gap-1">
                              <Link href={e.url}>
                                <div className="relative w-14 h-14">
                                  <Image
                                    style={{ filter: " brightness(0.8)" }}
                                    className="w-full h-full object-contain rounded-lg"
                                    src={getImageUrl(e.image)}
                                    alt={e?.title}
                                    width={20}
                                    height={20}
                                    unoptimized
                                  />
                                  {e.discount !== 0 && (
                                    <span className="absolute top-2 right-0 bg-[#d1182baa] px-2 py-0.5 rounded-sm !text-white text-xs font-bold">
                                      {e.discount}٪
                                    </span>
                                  )}
                                </div>
                              </Link>
                              <div className="flex flex-col items-start justify-between">
                                <Link
                                  className="hover:text-[#d1182b] text-[#0009] duration-300 px-2 !text-justify"
                                  href={e.url}
                                >
                                  <span className="text-xs font-bold line-clamp-2 ">
                                    {e?.title}
                                  </span>
                                </Link>
                                {e.showPrice && (
                                  <span className=" font-bold line-clamp-2 text-[#d1182b] whitespace-nowrap px-2">
                                    {e?.finalPrice.toLocaleString()}
                                    <span className="text-xs px-1">تومان</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowProductBasket;
