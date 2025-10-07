import { getComment } from "@/services/comments/serviceComment";
import { getListItemByIds } from "@/services/Item/item";
import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { FaClipboardList } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import CommentProduct from "./CommentProduct";
import ProductTabs from "./ProductTabs";

async function BodyProduct({ product }) {
  function groupByCategory(properties) {
    // فقط آیتم‌هایی که isTechnicalProperty=true دارند
    const filtered = properties.filter((prop) => prop.isTechnicalProperty);
    const groups = {};
    filtered.forEach((prop) => {
      if (!groups[prop.propertyCategoryId]) {
        groups[prop.propertyCategoryId] = {
          title: prop.propertyCategoryTitle,
          propertyCategoryId: prop.propertyCategoryId,
          propertyCategoryPriority: prop.propertyCategoryPriority ?? 0,
          items: [],
        };
      }
      groups[prop.propertyCategoryId].items.push(prop);
    });
    // مرتب‌سازی آیتم‌های هر گروه بر اساس priority (نزولی)
    Object.values(groups).forEach((group) => {
      group.items.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    });
    // مرتب‌سازی گروه‌ها بر اساس propertyCategoryPriority (نزولی)، سپس propertyCategoryId (نزولی)
    return Object.values(groups).sort((a, b) => {
      if (
        (b.propertyCategoryPriority ?? 0) !== (a.propertyCategoryPriority ?? 0)
      ) {
        return (
          (b.propertyCategoryPriority ?? 0) - (a.propertyCategoryPriority ?? 0)
        );
      }
      return (b.propertyCategoryId ?? 0) - (a.propertyCategoryId ?? 0);
    });
  }
  const grouped = groupByCategory(product.properties);

  let relatedProducts = [];
  if (product?.product?.relatedId) {
    relatedProducts = await getRelatedProductsByIdString(
      product?.product?.relatedId
    );
  }

  let listVideo = [];
  if (product?.product?.relatedId) {
    listVideo = await getListItemByIds(
      product.properties.find((e) => e.propertyKey === "related_videos")?.value
    );
  }

  let comments = [];
  if (product?.product?.relatedId) {
    comments = await getComment(product.product.productId, 1, 0);
  }

  let commentsQuestion = [];
  if (product?.product?.relatedId) {
    commentsQuestion = await getComment(product.product.productId, 1, 1);
  }


  return (
    <>
      <div className="!hidden">
        <div className="py-9 px-7">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.product.body }}
          />
        </div>
        <div className="mt-5 w-full px-5">
          {grouped.map((group, idx) => (
            <div
              key={idx}
              className="mb-7 bg-white rounded-lg shadow border border-gray-100"
            >
              <div className="bg-[#f3f3f3] rounded-t-lg px-6 py-3 border-b border-gray-100 flex items-center">
                <FaClipboardList className="text-[#d1182b] mr-2 text-lg" />
                <span className="font-bold text-gray-800 text-base">
                  {group.title}
                </span>
              </div>
              <div className="divide-y divide-gray-100">
                {group.items.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center py-3 px-6 hover:bg-gray-50 transition"
                  >
                    <div className="w-1/2 text-gray-700 text-sm">
                      {property.title}
                    </div>
                    <div className="w-1/2 font-semibold text-gray-900 text-sm text-left">
                      {property.propertyValue}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {relatedProducts.length > 0 &&
          relatedProducts.map((item, index) => (
            <div
              key={index}
              className="w-full border border-gray-200 rounded-lg"
            >
              <div className="flex  items-center gap-3 py-3   bg-white rounded-lg relative h-[120px] min-h-[96px] hover:bg-gray-50 transition-all">
                <Link
                  href={item.url}
                  className="flex-shrink-0 w-20 h-20 relative overflow-hidden "
                >
                  <img
                    className="object-contain w-20 h-20"
                    src={getImageUrl(item.image)}
                    alt={item.title}
                  />
                </Link>
                <div className="flex-1  min-w-0 flex flex-col justify-between h-full">
                  <Link
                    href={item.url}
                    className="text-[#333] font-bold hover:text-[#d1182b] duration-300 cursor-pointer line-clamp-3 text-sm mb-1"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-auto">
                    {!item.callPriceButton && item.finalPrice > 0 && (
                      <>
                        <span className="text-sm font-bold text-[#d1182b]">
                          {item.finalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">تومان</span>
                      </>
                    )}
                    {item.callPriceButton && (
                      <span className="text-sm font-bold text-[#d1182b]">
                        تماس بگیرید
                      </span>
                    )}
                    {!item.callPriceButton && item.finalPrice === 0 && (
                      <span className="text-sm font-bold text-[#d1182b]">
                        بدون قیمت
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full ml-2 ">
                  {item.discount !== 0 && !item.callPriceButton && (
                    <span className="bg-[#d1182b] !text-white rounded-md px-2 py-0.5 text-xs mb-1">
                      {item.discount}%
                    </span>
                  )}

                  {!item.canAddCart && (
                    <div className="mt-auto flex items-center gap-1 text-xs text-[#666] bg-[#e1e1e1] px-2 py-1 rounded">
                      <SlBasket className="text-base text-[#333]" />
                      <span>{item.statusDesc}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        <CommentProduct id={product.product.productId} type={0} />
        <CommentProduct id={product.product.productId} type={1} />
      </div>

      <ProductTabs
        product={product}
        relatedProducts={relatedProducts}
        listVideo={listVideo}
        comments={comments}
        commentsQuestion={commentsQuestion}
      />
    </>
  );
}

export default BodyProduct;
