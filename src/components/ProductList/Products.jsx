import { FaCartShopping, FaEye } from "react-icons/fa6";
import ShowProperty from "./ShowProperty";
import Timer from "./Timer";
import Link from "next/link";
import PriceProduct from "./PriceProduct";
import ExpandableText from "../Product/ExpandableText";

function Products({ products, layout = "list" }) {
  console.log(products);
  
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg relative z-50">
      <div className="flex w-full flex-wrap">
        <div className="p-3 md:w-1/3 w-full">
        <Link href={product.url}>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={product.img}
            alt={product.title}
          />
        </Link>
        </div>
        <div className="p-5 md:w-1/3 w-full">
          <h5 className="font-semibold text-lg">{product.title}</h5>
          {/* <ExpandableText product={product} /> */}
        </div>
        <div className="md:w-1/3 w-full bg-[#f9f9f9] px-8">
          <div className="flex flex-col w-full h-full">
           
            <PriceProduct product={product}/>
            <div className="flex items-center py-2">
              <img src="/images/icons/benchmark.png" alt="" />
              <span className="px-3"> مقایسه محصول </span>
            </div>
            <div className="flex items-center py-2">
              <img src="/images/icons/fast-delivery-2.png" alt="" />
              <span className="px-3"> ضمانت اصل بودن کالا </span>
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
                <button className="flex items-center bg-[#d1182b] text-white duration-300 hover:bg-[#40768c] w-full p-2 justify-center gap-2 cursor-pointer rounded-sm">
                  <FaCartShopping className="" />
                  <span className="">افزودن به سبد خرید</span>
                </button>
                {/* {product.discount > 0 && (
                  <Timer targetDate={product.timeDiscount} />
                )} */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const GridProductCard = ({ product }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex flex-col items-center flex-grow">
        <img
          className="w-40 h-40 object-cover rounded-lg mb-4"
          src={product.img}
          alt={product.title}
        />
        <h5 className="font-semibold text-lg text-center mb-2 line-clamp-2">
          {product.title}
        </h5>
        {product.statusId === 1 && product.discount > 0 && (
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl text-[#d1182b]">
                {product.finalPrice.toLocaleString()}
              </span>
              <span className="text-[#555]">تومان</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-[#888]">
                {product.price.toLocaleString()}
              </span>
              <span className="text-white bg-[#d1182b] px-2 py-0.5 rounded-sm text-sm">
                {product.discount}%
              </span>
            </div>
          </div>
        )}
        {product.statusId === 1 && product.discount === 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="font-semibold text-xl">
              {product.price.toLocaleString()}
            </span>
            <span className="text-[#555]">تومان</span>
          </div>
        )}
        <div className="mt-auto w-full space-y-2">
          <Link
            href={`${product.url}`}
            className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white py-2 rounded-sm hover:bg-teal-600 transition-colors cursor-pointer"
          >
            <FaEye />
            <span>مشاهده جزئیات</span>
          </Link>
          { product.canAddCart && (
            <button className="w-full flex items-center justify-center gap-2 bg-[#d1182b] text-white py-2 rounded-sm hover:bg-[#40768c] transition-colors cursor-pointer">
              <FaCartShopping />
              <span>افزودن به سبد خرید</span>
            </button>
          )}
        
          {!product.canAddCart && (
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
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
          : "space-y-5"
      }
    >
      {products.map((product) => (
        <div key={product.id} className={layout === "grid" ? "h-full" : "mt-5"}>
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
