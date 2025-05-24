import { getImageUrl } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCartShopping, FaRecycle, FaTruck, FaTruckFast } from "react-icons/fa6";
import { Tooltip } from "antd";
import ExpandableText from "../Product/ExpandableText";
import AddToCartButton from "./AddToCartButton";
import PriceProduct from "./PriceProduct";


function Products({ products, layout = "list" }) {


  console.log(products);



  const ProductCard = ({ product }) => (


    <>
      <div className="bg-white rounded-lg relative z-50">
        <div className="flex w-full flex-wrap">
          <div className="p-3 lg:w-1/3 w-full relative flex items-center justify-center">
            <Link href={product.url}>
              <img
                className="w-48 h-48 object-contain rounded-lg"
                src={getImageUrl(product.image)}
                alt={product.title}
              />
            </Link>
            {product.conditionId === 20 && (
              <div className="absolute top-2 right-2 bg-[#40768c] text-white px-3 py-1 rounded-sm transform shadow-md">
                کارکرده
              </div>
            )}
          </div>
          <div className="p-5 lg:w-1/3 w-full">
            <Link href={product.url} className="hover:text-[#d1182b] duration-300">
              <h5 className="font-semibold text-lg">{product.title}</h5>
            </Link>
            {
              product.summary &&
              <ExpandableText text={product.summary} />
            }
          </div>
          <div className="lg:w-1/3 w-full bg-[#f9f9f9] p-4 lg:px-8 ">
            <div className="flex flex-col w-full h-full">
              <PriceProduct product={product} />
              <div className="flex items-center py-2">
                <img src="/images/icons/benchmark.png" alt="" />
                <span className="px-3"> مقایسه محصول </span>
              </div>
              <div className="flex items-center py-2">
                <img src="/images/icons/fast-delivery-2.png" alt="" />
                <span className="px-3"> ضمانت اصل بودن کالا </span>
              </div>
              <div className="flex items-center gap-3 mb-2">

              {product.fastShipping && (
                <div className="flex items-center py-2 text-[#d1182b]">
                  <FaTruckFast className="text-lg" />
                  <span className="px-3 font-semibold"> ارسال سریع </span>
                </div>
              )}
              {product.freeShipping && (
                <div className="flex items-center py-2 text-[#40768c]">
                  <FaTruck className="text-lg" />
                  <span className="px-3 font-semibold"> ارسال رایگان </span>
                </div>
              )}
              </div>
              {!product.canAddCart && (
                <div className="mt-2">
                  <button className="flex items-center bg-[#e1e1e1] w-full p-2 justify-center gap-2 rounded-sm">
                    <FaCartShopping className="text-[#333]" />
                    <span className="text-[#666]">موجود نیست</span>
                  </button>
                </div>
              )}
              {product.canAddCart && (
                <div className="mt-2 flex flex-col gap-2">
                  <AddToCartButton productId={product.productId} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const GridProductCard = ({ product }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex flex-col items-center flex-grow">
        <div className="relative w-full flex justify-center items-center">
          <Link href={`${product.url}`}>
            <img
              className="w-40 h-40 object-contain rounded-lg mb-4"
              src={getImageUrl(product.image)}
              alt={product.title}
            />
          </Link>
          {product.conditionId === 20 && (
            <div className="absolute top-0 right-0 bg-[#40768c] text-white px-3 py-1 rounded-sm transform shadow-md">
              کارکرده
            </div>
          )}
        </div>
        <Link href={`${product.url}`} className="font-semibold text-lg text-center mb-2 line-clamp-2 hover:text-[#d1182b] duration-300">
          {product.title}
        </Link>

         <div className="flex items-center justify-center gap-3 mb-2">
            {product.fastShipping && (
              <Tooltip title="ارسال سریع" placement="top">
                <FaTruckFast className="text-2xl text-[#d1182b] cursor-pointer" />
              </Tooltip>
            )}
            {product.freeShipping && (
              <Tooltip title="ارسال رایگان" placement="top">
                <FaTruck className="text-2xl text-[#40768c] cursor-pointer" />
              </Tooltip>
            )}
          </div>


        {product.statusId === 1 && product.discount > 0 && (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl text-[#d1182b]">
                {product?.finalPrice?.toLocaleString()}
              </span>
              <span className="text-[#555]">تومان</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-[#888]">
                {product?.price1?.toLocaleString()}
              </span>
              <span className="text-white bg-[#d1182b] px-2 py-0.5 rounded-sm text-sm">
                {product.discount}%
              </span>
            </div>
          </div>
        )}
        <div className="mt-auto w-full space-y-2 flex flex-col justify-center items-center">
          {product.statusId === 1 && product.discount === 0 && (
            <div className="flex items-center gap-2 mb-4">
              {
                product?.price1 !== 0 &&
                <div>
                  <span className="font-semibold text-xl">
                    {product?.price1?.toLocaleString()}
                  </span>
                  <span className="text-[#555] px-1">تومان</span>
                </div>
              }
              {
                product?.price1 === 0 &&
                <div>
                  <span className="text-[#555]">بدون قیمت</span>
                </div>
              }
            </div>
          )}
         
          {product.canAddCart ? (
            <AddToCartButton productId={product.productId} />
          ) : (
            <button className="w-full flex items-center justify-center gap-2 bg-[#e1e1e1] text-[#666] py-2 rounded-sm">
              <FaCartShopping />
              <span>موجود نیست</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={
        layout === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
          : "space-y-5 mt-5"
      }
    >
      {products.map((product) => (
        <div key={product.id} className={layout === "grid" ? "h-full" : ""}>
          {layout === "grid" ? (
            <GridProductCard product={product} />
          ) : (
            <ProductCard product={product} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Products;
