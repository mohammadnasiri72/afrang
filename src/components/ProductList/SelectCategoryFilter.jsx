"use client";

import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Collapse, Divider, Switch, Skeleton } from "antd";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { getCategoryChild } from "@/services/Property/propertyService";

const theme = createTheme({
  direction: "rtl", // فعال کردن RTL برای تم MUI
});

function SelectCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
  });

  const [apiData, setApiData] = useState({
    brands: [],
    categories: {},
    maxPrice: 100000
  });

  const [loading, setLoading] = useState(true);
  const [valuePrice, setValuePrice] = useState([0, 100000]);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState(100000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [valueCategory, setValueCategory] = useState([]);
  const [activeKeys, setActiveKeys] = useState(["1"]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [switchStates, setSwitchStates] = useState({
    available: false,    // محصولات موجود
    discount: false,     // محصولات تخفیف‌دار
    vip: false,         // محصولات فروش ویژه
    price: false,       // محصولات قیمت‌دار
    secondHand: false   // کالای دست دوم
  });

  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  useEffect(() => {
    const mainCategoryId = params?.slug?.[0];
    if (!mainCategoryId) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getCategoryChild(mainCategoryId);
        if (result) {
          setApiData({
            brands: result.brands || [],
            categories: result.categories || {},
            maxPrice: result.maxPrice || 100000
          });
          setDefaultMaxPrice(result.maxPrice || 100000);
          setValuePrice([0, result.maxPrice || 100000]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const urlCategories = searchParams.get("category") || "";
    const price1 = searchParams.get("price1");
    const price2 = searchParams.get("price2");

    setFilters({
      category: urlCategories ? urlCategories.split(",") : [],
      minPrice: price1 || "",
      maxPrice: price2 || "",
    });

    // تنظیم مقادیر اسلایدر بر اساس URL یا مقادیر پیش‌فرض
    setValuePrice([
      price1 ? parseInt(price1) : 0,
      price2 ? parseInt(price2) : defaultMaxPrice
    ]);

    if (searchParams.get("category")) {
      setValueCategory(searchParams.get("category").split(",") || []);
    } else {
      setValueCategory([]);
    }

    // خواندن برندهای انتخاب شده از URL در لود اولیه
    const brandsFromUrl = searchParams.get("BrandId");
    if (brandsFromUrl) {
      setSelectedBrands(brandsFromUrl.split(","));
    } else {
      setSelectedBrands([]);
    }
  }, [searchParams, defaultMaxPrice]);

  useEffect(() => {
    setSwitchStates({
      available: searchParams.get('statusid') === '1' || searchParams.get('StatusId') === '1',
      discount: searchParams.get('onlydiscount') === '1',
      vip: searchParams.get('onlyfest') === '1',
      price: searchParams.get('onlyprice') === '1',
      secondHand: searchParams.get('ConditionId') === '20' || searchParams.get('conditionId') === '20'
    });
  }, [searchParams]);

  const handleBrandChange = (brandId) => {
    let newSelectedBrands;
    if (selectedBrands.includes(brandId)) {
      newSelectedBrands = selectedBrands.filter(id => id !== brandId);
    } else {
      newSelectedBrands = [...selectedBrands, brandId];
    }
    setSelectedBrands(newSelectedBrands);

    // به‌روزرسانی URL به صورت مستقیم
    const params = new URLSearchParams(searchParams.toString());
    // حذف پارامتر page برای برگشت به صفحه اول
    params.delete('page');
    
    if (newSelectedBrands.length > 0) {
      params.set("BrandId", newSelectedBrands.join(","));
    } else {
      params.delete("BrandId");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleFilterChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    // حذف پارامتر page برای برگشت به صفحه اول
    params.delete('page');

    // فقط اضافه کردن قیمت‌ها به URL
    if (valuePrice[0] > 0) {
      params.set("price1", valuePrice[0]);
    } else {
      params.delete("price1");
    }

    if (valuePrice[1] < defaultMaxPrice) {
      params.set("price2", valuePrice[1]);
    } else {
      params.delete("price2");
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
    });
    setSelectedBrands([]);
    setValuePrice([0, defaultMaxPrice]);
    
    // برگشت به URL اصلی کتگوری فعلی (بدون پارامترها)
    const mainCategoryId = params?.slug?.[0];
    const mainCategoryTitle = params?.slug?.[1];
    if (mainCategoryId && mainCategoryTitle) {
      router.push(`/products/${mainCategoryId}/${mainCategoryTitle}`);
    }
  };

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  const handleCategoryClick = (id, title) => {
    setLoading(true);
    setSelectedCategory(id);
    
    const params = new URLSearchParams(searchParams.toString());
    // حذف پارامتر page برای برگشت به صفحه اول
    params.delete('page');
    
    const newUrl = `/products/${id}/${title}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };

  const handleSwitchChange = (type) => {
    const newStates = { ...switchStates, [type]: !switchStates[type] };
    setSwitchStates(newStates);

    const params = new URLSearchParams(searchParams.toString());
    
    // حذف پارامتر page برای برگشت به صفحه اول
    params.delete('page');
    
    // آپدیت پارامترها بر اساس وضعیت جدید سوئیچ‌ها
    if (newStates.available) {
      params.set('statusid', '1');
    } else {
      params.delete('statusid');
    }

    if (newStates.discount) {
      params.set('onlydiscount', '1');
    } else {
      params.delete('onlydiscount');
    }

    if (newStates.vip) {
      params.set('onlyfest', '1');
    } else {
      params.delete('onlyfest');
    }

    if (newStates.price) {
      params.set('onlyprice', '1');
    } else {
      params.delete('onlyprice');
    }

    if (newStates.secondHand) {
      params.set('conditionId', '20');
    } else {
      params.delete('conditionId');
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const filteredCategories = Object.entries(apiData.categories).filter(([id, title]) =>
    title.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = apiData.brands.filter((brand) =>
    brand.title.toLowerCase().includes(brandSearch.toLowerCase()) ||
    brand.titleEn.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const renderCategories = () => {
    if (loading) {
      return Array(5).fill(null).map((_, index) => (
        <div key={index} className="p-2.5 my-1">
          <Skeleton.Button
            active
            size="large"
            block
            style={{ 
              height: '40px',
              borderRadius: '6px'
            }}
          />
        </div>
      ));
    }

    if (filteredCategories.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          دسته‌بندی مورد نظر یافت نشد
        </div>
      );
    }

    return filteredCategories.map(([id, title]) => {
      const isSelected = selectedCategory === id;
      return (
        <div
          key={id}
          onClick={() => handleCategoryClick(id, title)}
          className={`p-2.5 my-1 rounded-md transition-all duration-300 cursor-pointer text-right
            ${isSelected
              ? 'bg-[#d1182b] text-white hover:bg-[#b31525]'
              : 'hover:bg-gray-100'
            }`}
        >
          <span className={isSelected ? 'text-white' : 'text-gray-800'}>
            {title}
          </span>
        </div>
      );
    });
  };

  const renderBrands = () => {
    if (loading) {
      return Array(5).fill(null).map((_, index) => (
        <div key={index} className="p-2">
          <Skeleton.Button
            active
            size="large"
            block
            style={{ 
              height: '30px',
              borderRadius: '6px'
            }}
          />
        </div>
      ));
    }

    if (filteredBrands.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          برند مورد نظر یافت نشد
        </div>
      );
    }

    return filteredBrands.map((brand) => (
      <div key={brand.id}>
        <FormControlLabel
          onChange={() => handleBrandChange(brand.id.toString())}
          sx={{
            width: "100%",
            p: 0,
            m: 0,
            "& .MuiFormControlLabel-label": {
              width: "100%",
            },
          }}
          control={
            <Checkbox checked={selectedBrands.includes(brand.id.toString())} />
          }
          label={
            <div
              style={{ fontFamily: "Yekan" }}
              className="select-none text-sm font-semibold w-full flex items-center justify-between"
            >
              <span className="w-full">{brand.title}</span>
              <span>{brand.titleEn}</span>
            </div>
          }
        />
        <Divider style={{ margin: 0, padding: 0 }} />
      </div>
    ));
  };

  const outerItems = [
    {
      key: "1",
      label: (
        <div className="text-[16px] font-semibold select-none">دسته بندی</div>
      ),
      children: (
        <div>
          <div className="mb-3 relative">
            <input
              type="text"
              placeholder="جستجو در دسته‌بندی‌ها..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="overflow-y-auto px-2" style={{ maxHeight: '250px' }}>
            <FormGroup dir="rtl">
              {renderCategories()}
            </FormGroup>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: <div className="text-[16px] font-semibold select-none">برند</div>,
      children: (
        <div>
          <div className="mb-3 relative">
            <input
              type="text"
              placeholder="جستجو در برندها..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="overflow-y-auto px-2" style={{ maxHeight: '250px' }}>
            <FormGroup>
              {renderBrands()}
            </FormGroup>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="text-[16px] font-semibold select-none">محدوده قیمت</div>
      ),
      children: (
        <div>
          <ThemeProvider theme={theme}>
            <div className="px-4">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={valuePrice}
                onChange={handleChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => value.toLocaleString()}
                sx={{
                  "& .MuiSlider-rail": {
                    backgroundColor: "#d8d8d8",
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#40768c",
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#40768c",
                    transform: "translate(50%, -50%)",
                  },
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "#40768c",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                  direction: "rtl",
                }}
                min={0}
                max={apiData.maxPrice}
                step={1000}
              />
            </div>
          </ThemeProvider>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full bg-[#f0f0f0] p-3 rounded-sm flex items-center justify-between">
              <span className="text-gray-500">از</span>
              <div className="font-semibold">{valuePrice[0].toLocaleString()} تومان</div>
            </div>
            <div className="w-full bg-[#f0f0f0] p-3 rounded-sm flex items-center justify-between">
              <span className="text-gray-500">تا</span>
              <div className="font-semibold">{valuePrice[1].toLocaleString()} تومان</div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleFilterChange}
              className="bg-[#18d1be] w-full rounded-lg duration-300 text-white hover:bg-[#d1182b] py-2 font-bold text-[16px] cursor-pointer"
            >
              اعمال فیلتر قیمت
            </button>
          </div>
        </div>
      ),
    },
  ];

  // فیلتر کردن آیتم‌ها بعد از اتمام لودینگ
  const filteredItems = loading 
    ? outerItems 
    : outerItems.filter((item, index) => {
        if (index === 0) return Object.keys(apiData.categories).length > 0 || categorySearch.length > 0;
        if (index === 1) return apiData.brands.length > 0 || brandSearch.length > 0;
        return true; // همیشه محدوده قیمت رو نشون بده
      });

  // اگر هیچ داده‌ای وجود نداشت و در حالت جستجو نیستیم، اکوردئون‌ها را مخفی کن
  const shouldShowCollapse = !loading && (
    Object.keys(apiData.categories).length > 0 || 
    apiData.brands.length > 0 || 
    categorySearch.length > 0 || 
    brandSearch.length > 0
  );

  // تابع برای بررسی وجود فیلترهای فعال
  const hasActiveFilters = () => {
    return (
      selectedBrands.length > 0 ||
      valuePrice[0] > 0 ||
      valuePrice[1] < defaultMaxPrice ||
      switchStates.available ||
      switchStates.discount ||
      switchStates.vip ||
      switchStates.price ||
      switchStates.secondHand ||
      searchParams.get("category") ||
      searchParams.get("OrderBy")
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-lg">فیلترها</h4>
        {hasActiveFilters() && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300 group cursor-pointer"
          >
            <IoCloseOutline className="text-red-600 text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span className="text-red-600 text-sm font-semibold">
              حذف فیلتر‌ها
            </span>
          </button>
        )}
      </div>
      <Divider style={{marginBottom: "0px"}}/>
      {shouldShowCollapse ? (
        <Collapse
          ghost
          expandIconPosition="end"
          items={filteredItems}
          activeKey={activeKeys}
          onChange={handleCollapseChange}
          expandIcon={({ isActive }) => (
            <FaAngleUp className={isActive ? "rotateico" : "ico"} />
          )}
          className="[&_.ant-collapse-content]:!px-0 [&_.ant-collapse-item]:!border-0 [&_.ant-collapse-header]:!px-0 [&_.ant-collapse-content-box]:!px-0"
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          هیچ فیلتری برای نمایش وجود ندارد
        </div>
      )}
      <div className="flex flex-col gap-4 mt-6 border-t pt-6">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">محصولات موجود</span>
          <Switch 
            checked={switchStates.available}
            onChange={() => handleSwitchChange('available')}
            style={{ color: "#d1182b" }} 
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">محصولات تخفیف‌دار</span>
          <Switch 
            checked={switchStates.discount}
            onChange={() => handleSwitchChange('discount')}
            style={{ color: "#d1182b" }} 
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">محصولات فروش ویژه</span>
          <Switch 
            checked={switchStates.vip}
            onChange={() => handleSwitchChange('vip')}
            style={{ color: "#d1182b" }} 
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">محصولات قیمت‌دار</span>
          <Switch 
            checked={switchStates.price}
            onChange={() => handleSwitchChange('price')}
            style={{ color: "#d1182b" }} 
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">کالای دست دوم</span>
          <Switch 
            checked={switchStates.secondHand}
            onChange={() => handleSwitchChange('secondHand')}
            style={{ color: "#d1182b" }} 
          />
        </div>
      </div>
    </>
  );
}

export default SelectCategoryFilter;
