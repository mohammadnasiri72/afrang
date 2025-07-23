"use client";

import { getProductTerm } from "@/services/products/productService";
import { getImageUrl2 } from "@/utils/mainDomain";
import { Input, Modal, Spin } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AddProductToCompareModal = ({ visible, onClose , catIds}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const router = useRouter();
  const params = useParams();

  const handleSearch = (value) => {
    setSearchTerm(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const data = await getProductTerm(value , catIds);
        setResults(data || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const handleSelectProduct = (product) => {
    const currentIds = params.ids
      ? decodeURIComponent(params.ids)
          .split(",")
          .filter((id) => id)
          .map((id) => parseInt(id.trim()))
      : [];
    const newIds = [...currentIds, product.productId];
    const newUrl = `/compare/${newIds.join(",")}`;
    router.push(newUrl);
    onClose();
  };

  useEffect(() => {
    if (!visible) {
      setSearchTerm("");
      setResults([]);
    }
  }, [visible]);

  return (
    <Modal
      title="افزودن محصول برای مقایسه"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      zIndex={2000000}
    >
      <div className="py-4">
        <Input.Search
          placeholder="جستجوی محصول..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          loading={loading}
          enterButton
        />

        <div className="mt-4 max-h-80 overflow-y-auto">
          {loading && results.length === 0 && (
            <div className="text-center p-4">
              <Spin />
            </div>
          )}
          {results.length > 0 ? (
            <div>
              {results.map((product) => (
                <div
                  key={product.productId}
                  style={{ cursor: "pointer" }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors rounded-lg cursor-pointer"
                  onClick={() => handleSelectProduct(product)}
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={getImageUrl2(product.image)}
                      alt={product.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {product.title}
                    </h3>
                    {!product.priceDesc && product.finalPrice > 0 && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold text-[#d1182b]">
                          {product.finalPrice.toLocaleString()} تومان
                        </span>
                      </div>
                    )}
                    {product.priceDesc && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600">
                          {product.priceDesc}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : !loading && searchTerm.length >= 2 ? (
            <div className="text-center text-gray-500 p-4">
              نتیجه‌ای یافت نشد
            </div>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default AddProductToCompareModal;
