import { getListItemByIds } from "@/services/Item/item";
import { getRelatedProductsByIdString } from "@/services/products/productService";
import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { FaClipboardList, FaPlay } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import dynamic from "next/dynamic";

const CommentProduct = dynamic(() => import("./CommentProduct"));
const ProductTabs = dynamic(() => import("./ProductTabs"));

async function BodyProductServer({ product }) {
  // Check if product exists and has required data
  if (!product || !product.product || !product.properties) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <div className="text-gray-500 text-lg mb-4">
          اطلاعات محصول در دسترس نیست
        </div>
        <p className="text-gray-400">
          متأسفانه مشخصات این محصول در حال حاضر در دسترس نیست.
        </p>
      </div>
    );
  }

  let result = [];
  try {
    if (product?.product?.relatedId) {
      result = await getRelatedProductsByIdString(product?.product?.relatedId);
    }
  } catch (error) {
    console.error("Error fetching related products:", error);
    result = [];
  }

  // شرط وجود ویدئوهای مرتبط
  const hasRelatedVideos =
    Array.isArray(product?.properties) &&
    product.properties.some((p) => p.propertyKey === "related_videos");

  let listVideo = [];
  try {
    if (hasRelatedVideos) {
      const ids = product.properties.find(
        (e) => e.propertyKey === "related_videos"
      )?.value;
      if (ids) {
        listVideo = await getListItemByIds(ids);
      }
    }
  } catch (error) {
    console.error("Error fetching video items:", error);
    listVideo = [];
  }

  function groupByCategory(properties) {
    if (!Array.isArray(properties)) return [];
    
    // فقط آیتم‌هایی که isTechnicalProperty=true دارند
    const filtered = properties.filter((prop) => prop.isTechnicalProperty);
    const groups = {};
    filtered.forEach((prop) => {
      const category = prop.category || "سایر";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(prop);
    });
    return Object.entries(groups).map(([category, props]) => ({
      category,
      properties: props,
    }));
  }

  function extractIframeTag(html) {
    if (!html) return null;
    const iframeMatch = html.match(/<iframe[^>]*>.*?<\/iframe>/i);
    return iframeMatch ? iframeMatch[0] : null;
  }

  function renderVideo(video) {
    if (!video) return null;
    
    const iframeTag = extractIframeTag(video.html);
    if (!iframeTag) return null;

    return (
      <div key={video.id} className="mb-6">
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{video.title}</h3>
          <div
            className="video-container"
            dangerouslySetInnerHTML={{ __html: iframeTag }}
          />
        </div>
      </div>
    );
  }

  const groupedProperties = groupByCategory(product.properties);

  return (
    <>
      <div className="bg-white rounded-lg p-6">
        {/* مشخصات فنی */}
        {groupedProperties.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaClipboardList className="text-[#d1182b] ml-2" />
              <h2 className="text-xl font-semibold">مشخصات فنی</h2>
            </div>
            <div className="space-y-6">
              {groupedProperties.map((group, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">
                    {group.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.properties.map((prop, propIndex) => (
                      <div
                        key={propIndex}
                        className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-600 font-medium">
                          {prop.title}
                        </span>
                        <span className="text-gray-800 font-semibold">
                          {prop.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ویدئوهای مرتبط */}
        {hasRelatedVideos && listVideo.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <FaPlay className="text-[#d1182b] ml-2" />
              <h2 className="text-xl font-semibold">ویدئوهای مرتبط</h2>
            </div>
            {listVideo.map((video) => renderVideo(video))}
          </div>
        )}

        {/* محصولات مرتبط */}
        {result.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <SlBasket className="text-[#d1182b] ml-2" />
                <h2 className="text-xl font-semibold">محصولات مرتبط</h2>
              </div>
              <Link
                href={`/products?related=${product.product.productId}`}
                className="text-[#d1182b] hover:text-[#b31414] text-sm font-medium"
              >
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}/${item.url || ""}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title || "محصول"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.src = "/images/placeholder.jpg";
                        }}
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {item.title || "محصول"}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[#d1182b] font-bold text-sm">
                        {item.price ? `${item.price.toLocaleString()} تومان` : "قیمت نامشخص"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* توضیحات محصول */}
        {product.product.body && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">توضیحات محصول</h2>
            <div
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.product.body || "",
              }}
            />
          </div>
        )}

        {/* کامنت‌ها */}
        <CommentProduct id={product.product.productId} type={0} />
        <CommentProduct id={product.product.productId} type={1} />
      </div>

      <ProductTabs product={product} relatedProducts={result} />
    </>
  );
}

export default BodyProductServer;
