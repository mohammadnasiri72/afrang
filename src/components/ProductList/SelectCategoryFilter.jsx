"use client";

import { setFilterLoading } from "@/redux/features/filterLoadingSlice";
import { Checkbox, FormControlLabel, FormGroup, Slider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Collapse, Divider, Switch } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaSearch } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import FilterProperties from "./FilterProperties";

const theme = createTheme({
  direction: "rtl", // فعال کردن RTL برای تم MUI
});

function SelectCategoryFilter({ resultFilter, setVisible }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [valuePrice, setValuePrice] = useState([0, resultFilter?.maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [activeKeys, setActiveKeys] = useState(["1"]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [switchStates, setSwitchStates] = useState({
    available: false, // محصولات موجود
    discount: false, // محصولات تخفیف‌دار
    vip: false, // محصولات فروش ویژه
    price: false, // محصولات قیمت‌دار
    secondHand: false, // کالای دست دوم
  });

  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  useEffect(() => {
    const urlCategories = searchParams.get("category") || "";
    const price1 = searchParams.get("price1");
    const price2 = searchParams.get("price2");

    // تنظیم مقادیر اسلایدر بر اساس URL یا مقادیر پیش‌فرض
    setValuePrice([
      price1 ? parseInt(price1) : 0,
      price2 ? parseInt(price2) : resultFilter.maxPrice,
    ]);

    // خواندن برندهای انتخاب شده از URL در لود اولیه
    const brandsFromUrl = searchParams.get("brandid");
    if (brandsFromUrl) {
      setSelectedBrands(brandsFromUrl.split(","));
    } else {
      setSelectedBrands([]);
    }
  }, [searchParams, resultFilter?.maxPrice]);

  useEffect(() => {
    setSwitchStates({
      available:
        searchParams.get("statusid") === "1" ||
        searchParams.get("StatusId") === "1",
      discount: searchParams.get("onlydiscount") === "1",
      vip: searchParams.get("onlyfest") === "1",
      price: searchParams.get("onlyprice") === "1",
      secondHand:
        searchParams.get("ConditionId") === "20" ||
        searchParams.get("conditionId") === "20",
    });
  }, [searchParams]);

  // تابع برای گرفتن عنوان برندهای انتخاب شده
  const getSelectedBrandsTitles = () => {
    return selectedBrands
      .map((brandId) => {
        const brand = resultFilter.brands.find(
          (b) => b.id.toString() === brandId
        );
        return brand ? brand.title : "";
      })
      .filter(Boolean);
  };

  // تابع برای بررسی آیا برندی انتخاب شده است
  const hasSelectedBrands = () => {
    return selectedBrands.length > 0;
  };

  // تابع برای بررسی آیا قیمت فیلتر شده است
  const hasPriceFilter = () => {
    return valuePrice[0] > 0 || valuePrice[1] < resultFilter.maxPrice;
  };

  const handleBrandChange = (brandid) => {
    dispatch(setFilterLoading(true));
    let newSelectedBrands;
    if (selectedBrands.includes(brandid)) {
      newSelectedBrands = selectedBrands.filter((id) => id !== brandid);
    } else {
      newSelectedBrands = [...selectedBrands, brandid];
    }
    setSelectedBrands(newSelectedBrands);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (newSelectedBrands.length > 0) {
      params.set("brandid", newSelectedBrands.join(","));
    } else {
      params.delete("brandid");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
    
  };

  const handleFilterChange = () => {
    dispatch(setFilterLoading(true));
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (valuePrice[0] > 0) {
      params.set("price1", valuePrice[0]);
    } else {
      params.delete("price1");
    }

    if (valuePrice[1] < resultFilter.maxPrice) {
      params.set("price2", valuePrice[1]);
    } else {
      params.delete("price2");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
    
  };

  const handleResetFilters = () => {
    dispatch(setFilterLoading(true));

    setSelectedBrands([]);
    setValuePrice([0, resultFilter.maxPrice]);

    // پاک کردن همه پارامترهای URL و اضافه کردن OrderBy=5
    const params = new URLSearchParams();
    params.set("orderby", "5");
    router.push(`${window.location.pathname}?${params.toString()}`);
   
  };

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  const handleCategoryClick = (id, title, url) => {
    setSelectedCategory(id);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    router.push(`${url}${params.toString() ? `?${params.toString()}` : ""}`);
   
  };

  const handleSwitchChange = (type) => {
    dispatch(setFilterLoading(true));
    const newStates = { ...switchStates, [type]: !switchStates[type] };
    setSwitchStates(newStates);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (newStates.available) {
      params.set("statusid", "1");
    } else {
      params.delete("statusid");
    }

    if (newStates.discount) {
      params.set("onlydiscount", "1");
    } else {
      params.delete("onlydiscount");
    }

    if (newStates.vip) {
      params.set("onlyfest", "1");
    } else {
      params.delete("onlyfest");
    }

    if (newStates.price) {
      params.set("onlyprice", "1");
    } else {
      params.delete("onlyprice");
    }

    if (newStates.secondHand) {
      params.set("conditionId", "20");
    } else {
      params.delete("conditionId");
    }
    router.push(`${window.location.pathname}?${params.toString()}`);
    
  };

  const filteredCategories = Array.isArray(resultFilter.categories)
    ? resultFilter.categories.filter((category) =>
        category.title.toLowerCase().includes(categorySearch.toLowerCase())
      )
    : [];

  const filteredBrands = resultFilter.brands.filter(
    (brand) =>
      brand.title.toLowerCase().includes(brandSearch.toLowerCase()) ||
      brand.titleEn.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const renderCategories = () => {
    if (filteredCategories.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          دسته‌بندی مورد نظر یافت نشد
        </div>
      );
    }

    return filteredCategories.map((category) => {
      const isSelected = selectedCategory === category.id;
      return (
        <div
          key={category.id}
          onClick={() =>
            handleCategoryClick(category.id, category.title, category.url)
          }
          className={`p-2.5 my-1 rounded-md transition-all duration-300 cursor-pointer text-right
            ${
              isSelected
                ? "bg-[#d1182b] !text-white hover:bg-[#b31525]"
                : "hover:bg-gray-100"
            }`}
        >
          <span className={isSelected ? "text-white" : "text-gray-800"}>
            {category.title}
          </span>
        </div>
      );
    });
  };

  const renderBrands = () => {
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
              <span className="w-full line-clamp-1">{brand.title}</span>
              <span className="whitespace-nowrap">{brand.titleEn}</span>
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
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold select-none">
              دسته بندی
            </span>
            {selectedCategory && (
              <GoDotFill className="text-teal-500 text-sm" />
            )}
          </div>
          {selectedCategory && (
            <div className="text-xs text-gray-500 font-medium line-clamp-1">
              {
                resultFilter.categories.find((c) => c.id === selectedCategory)
                  ?.title
              }
            </div>
          )}
        </div>
      ),
      children: (
        <div>
          <div className="!mb-3 relative">
            <input
              type="text"
              placeholder="جستجو در دسته‌بندی‌ها..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent !text-[16px]"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="overflow-y-auto px-2" style={{ maxHeight: "250px" }}>
            <FormGroup dir="rtl">{renderCategories()}</FormGroup>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold select-none">برند</span>
            {hasSelectedBrands() && (
              <GoDotFill className="text-teal-500 text-sm" />
            )}
          </div>
          {hasSelectedBrands() && (
            <div className="text-xs text-gray-500 font-medium line-clamp-1">
              {getSelectedBrandsTitles().join("، ")}
            </div>
          )}
        </div>
      ),
      children: (
        <div>
          <div className="!mb-3 relative">
            <input
              type="text"
              placeholder="جستجو در برندها..."
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent !text-[16px]"
            />
            <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="overflow-y-auto px-2" style={{ maxHeight: "250px" }}>
            <FormGroup>{renderBrands()}</FormGroup>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-center gap-2">
            <span className="text-[16px] font-semibold select-none">
              محدوده قیمت
            </span>
            {hasPriceFilter() && (
              <GoDotFill className="text-teal-500 text-sm" />
            )}
          </div>
          {hasPriceFilter() && (
            <div className="text-xs text-gray-500 font-medium line-clamp-1">
              از {valuePrice[0].toLocaleString()} تا{" "}
              {valuePrice[1].toLocaleString()} تومان
            </div>
          )}
        </div>
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
                max={resultFilter.maxPrice}
                step={1000}
              />
            </div>
          </ThemeProvider>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full bg-[#f0f0f0] p-3 rounded-sm flex items-center justify-between">
              <span className="text-gray-500">از</span>
              <div className="font-semibold">
                {valuePrice[0].toLocaleString()} تومان
              </div>
            </div>
            <div className="w-full bg-[#f0f0f0] p-3 rounded-sm flex items-center justify-between">
              <span className="text-gray-500">تا</span>
              <div className="font-semibold">
                {valuePrice[1].toLocaleString()} تومان
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={handleFilterChange}
              className="bg-[#18d1be] w-full rounded-lg duration-300 !text-white hover:bg-[#d1182b] py-2 font-bold text-[16px] cursor-pointer"
            >
              اعمال فیلتر قیمت
            </button>
          </div>
        </div>
      ),
    },
  ];

  // فیلتر کردن آیتم‌ها بعد از اتمام لودینگ
  const filteredItems = outerItems.filter((item, index) => {
    if (index === 0)
      return (
        Object.keys(resultFilter.categories).length > 0 ||
        categorySearch.length > 0
      );
    if (index === 1)
      return resultFilter.brands.length > 0 || brandSearch.length > 0;
    return true; // همیشه محدوده قیمت رو نشون بده
  });

  // اگر هیچ داده‌ای وجود نداشت و در حالت جستجو نیستیم، اکوردئون‌ها را مخفی کن
  const shouldShowCollapse =
    Object.keys(resultFilter.categories).length > 0 ||
    resultFilter.brands.length > 0 ||
    categorySearch.length > 0 ||
    brandSearch.length > 0;

  // تابع برای بررسی وجود فیلترهای فعال
  const hasActiveFilters = () => {
    const orderBy = searchParams.get("orderby");
    const hasOnlyOrderBy2 = orderBy === "5" && searchParams.size === 1;

    return (
      !hasOnlyOrderBy2 &&
      (selectedBrands.length > 0 ||
        valuePrice[0] > 0 ||
        valuePrice[1] < resultFilter.maxPrice ||
        switchStates.available ||
        switchStates.discount ||
        switchStates.vip ||
        switchStates.price ||
        switchStates.secondHand ||
        searchParams.get("category") ||
        (orderBy && orderBy !== "5"))
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center! w-full">
          <span className="font-semibold text-lg">فیلترها</span>
          <IoCloseSharp
            onClick={() => {
              if (setVisible) {
                setVisible(false);
              }
            }}
            className="text-2xl cursor-pointer lg:hidden"
          />
        </div>
        {hasActiveFilters() && (
          <button
            onClick={handleResetFilters}
            className="flex items-center whitespace-nowrap gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300 group cursor-pointer"
          >
            <IoCloseOutline className="!text-red-600 text-xl group-hover:rotate-90 transition-transform duration-300" />
            <span className="!text-red-600 text-sm font-semibold">
              حذف فیلتر‌ها
            </span>
          </button>
        )}
      </div>
      <Divider style={{ marginBottom: "0px" }} />
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
      <div className="flex flex-col gap-2 mt-6 border-t pt-6">
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">
            محصولات موجود
          </span>
          <Switch
            checked={switchStates.available}
            onChange={() => handleSwitchChange("available")}
            style={{ color: "#d1182b" }}
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">
            محصولات تخفیف‌دار
          </span>
          <Switch
            checked={switchStates.discount}
            onChange={() => handleSwitchChange("discount")}
            style={{ color: "#d1182b" }}
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">
            محصولات فروش ویژه
          </span>
          <Switch
            checked={switchStates.vip}
            onChange={() => handleSwitchChange("vip")}
            style={{ color: "#d1182b" }}
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">
            محصولات قیمت‌دار
          </span>
          <Switch
            checked={switchStates.price}
            onChange={() => handleSwitchChange("price")}
            style={{ color: "#d1182b" }}
          />
        </div>
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-300">
          <span className="font-semibold text-base text-gray-700">
            کالای دست دوم
          </span>
          <Switch
            checked={switchStates.secondHand}
            onChange={() => handleSwitchChange("secondHand")}
            style={{ color: "#d1182b" }}
          />
        </div>
      </div>

      {resultFilter?.filterProperties &&
        resultFilter?.filterProperties.length > 0 && (
          <div className="flex flex-col gap-2 mt-6 border-t pt-6">
            <FilterProperties
              filterData={resultFilter.filterProperties}
            />
          </div>
        )}
    </>
  );
}

export default SelectCategoryFilter;
