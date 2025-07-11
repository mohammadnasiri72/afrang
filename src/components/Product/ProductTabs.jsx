'use client';

import { Segmented } from "antd";
import { useState, useEffect } from "react";
import ProductMain from "../home/ProductMain";
import AccessoriesProduct from "./AccessoriesProduct";
import CommentProduct from "./CommentProduct";
import DetailsProduct from "./DetailsProduct";
import SpecificationsProduct from "./SpecificationsProduct";
import BundleProducts from "./BundleProducts";
import { getRelatedProductsByIdString } from "@/services/products/productService";
import { useRef } from "react";
import RelatedProductsMobile from "./RelatedProductsMobile";

function ProductTabs({ product }) {
  const [tabProDetails, setTabProDetails] = useState(product.product.typeId === 3 ? 1 : 2);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  // refs for each section
  const bundleRef = useRef(null);
  const detailsRef = useRef(null);
  const specsRef = useRef(null);
  const commentsRef = useRef(null);
  const accessoriesRef = useRef(null);
  const qaRef = useRef(null);
  const segmentedBoxRef = useRef(null);
  const scrollBoxRef = useRef(null);
  const segmentedRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (product.product?.relatedId) {
        const relatedResult = await getRelatedProductsByIdString(product.product.relatedId);
        setRelatedProducts(relatedResult || []);
      }
      if (product.product?.similarId) {
        const similarResult = await getRelatedProductsByIdString(product.product.similarId);
        setSimilarProducts(similarResult || []);
      }
    };
    fetchProducts();
  }, [product.product?.relatedId, product.product?.similarId]);

  // Scroll spy logic (now for internal scroll box)
  useEffect(() => {
    const sectionRefs = [
      product.product.typeId === 3 ? bundleRef : null,
      detailsRef,
      specsRef,
      commentsRef,
      accessoriesRef,
      qaRef,
    ].filter(Boolean);
    const tabValues = [
      ...(product.product.typeId === 3 ? [1] : []),
      2, 3, 4, 5, 6
    ];
    let ticking = false;
    function onScroll() {
      if (!ticking && scrollBoxRef.current) {
        window.requestAnimationFrame(() => {
          let found = false;
          const box = scrollBoxRef.current;
          for (let i = sectionRefs.length - 1; i >= 0; i--) {
            const ref = sectionRefs[i];
            if (ref.current && box) {
              const boxRect = box.getBoundingClientRect();
              const refRect = ref.current.getBoundingClientRect();
              if (refRect.top - boxRect.top <= 120) { // 120px offset for sticky header
                setTabProDetails(tabValues[i]);
                found = true;
                break;
              }
            }
          }
          if (!found) setTabProDetails(tabValues[0]);
          ticking = false;
        });
        ticking = true;
      }
    }
    const box = scrollBoxRef.current;
    if (box) {
      box.addEventListener('scroll', onScroll, { passive: true });
    }
    return () => {
      if (box) box.removeEventListener('scroll', onScroll);
    };
  }, [product.product.typeId]);

  useEffect(() => {
    // Scroll Segmented horizontally to show active tab on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768 && segmentedRef.current) {
      const activeTab = segmentedRef.current.querySelector('.ant-segmented-item-selected');
      if (activeTab) {
        activeTab.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [tabProDetails]);

  const options = [
    ...(product.product.typeId === 3 ? [{ label: "محصولات دسته ای", value: 1 }] : []),
    { label: "توضیحات محصول", value: 2 },
    { label: "مشخصات فنی", value: 3 },
    { label: "نظرات", value: 4 },
    { label: "محصولات مرتبط", value: 5 },
    { label: "پرسش و پاسخ", value: 6 },
  ];

  // Scroll to section on tab click (now scrolls inside scrollBoxRef)
  const handleTabChange = (val) => {
    setTabProDetails(val);
    let ref = null;
    if (val === 1 && product.product.typeId === 3) ref = bundleRef;
    if (val === 2) ref = detailsRef;
    if (val === 3) ref = specsRef;
    if (val === 4) ref = commentsRef;
    if (val === 5) ref = accessoriesRef;
    if (val === 6) ref = qaRef;
    if (ref && ref.current && scrollBoxRef.current) {
      const box = scrollBoxRef.current;
      const boxRect = box.getBoundingClientRect();
      const refRect = ref.current.getBoundingClientRect();
      const offset = refRect.top - boxRect.top + box.scrollTop - 100; // 100px offset for sticky
      box.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="flex flex-wrap bg-white rounded-lg mt-3 z-50 relative  overflow-auto">
        <div
          ref={segmentedBoxRef}
          className="w-full SegmentedProduct overflow-hidden mx-auto flex justify-center p-5 sticky top-0 bg-white z-50"
          style={{ position: 'sticky', top: 0, zIndex: 5000, background: 'white' }}
        >
          <Segmented
            ref={segmentedRef}
            className="font-semibold text-3xl w-full overflow-auto"
            dir="rtl"
            style={{
              padding: "8px",
              fontFamily: "yekan",
              width: "100%",
            }}
            value={tabProDetails}
            onChange={handleTabChange}
            options={options}
          />
        </div>
        <div
          ref={scrollBoxRef}
          className="w-full h-96 overflow-auto"
        >
          {product.product.typeId === 3 && (
            <div ref={bundleRef} className="tab-section-scroll-anchor"><BundleProducts product={product} /></div>
          )}
          <div ref={detailsRef} className="tab-section-scroll-anchor"><DetailsProduct product={product} /></div>
          <div ref={specsRef} className="tab-section-scroll-anchor"><SpecificationsProduct product={product} /></div>
          <div ref={commentsRef} className="tab-section-scroll-anchor">
            <CommentProduct id={product.product.productId} type={0} />
          </div>
          <div ref={accessoriesRef} className="tab-section-scroll-anchor"><AccessoriesProduct product={product} /></div>
          <div ref={qaRef} className="tab-section-scroll-anchor">
            <CommentProduct id={product.product.productId} type={1} />
          </div>
        </div>
      </div>
      {
        relatedProducts.length > 0 &&
        <div className="sm:px-4 mt-20">
          <div className="sm:hidden flex justify-center items-center pb-10">
            <div className="sm:hidden flex items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مکمل</h2>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مکمل</h2>
            </div>
          </div>
        </div>
      }
      {
        relatedProducts.length > 0 &&
        <div className="mt-5">
          <ProductMain products={relatedProducts} />
        </div>
      }
      {/* {
        <div className="mt-5 sm:hidden block">
          <RelatedProductsMobile products={relatedProducts}/>
        </div>
      } */}
      {
        similarProducts.length > 0 &&
        <div className="sm:px-4 mt-20">
          <div className="sm:hidden flex justify-center items-center pb-10">
            <div className="sm:hidden flex items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مشابه</h2>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden items-center title-newProduct relative">
              <h2 className="font-semibold text-xl">محصولات مشابه</h2>
            </div>
          </div>
        </div>
      }
      {
        similarProducts.length > 0 &&
        <div className="mt-5">
          <ProductMain products={similarProducts} />
        </div>
      }
    </>
  );
}

export default ProductTabs; 