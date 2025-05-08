"use client";

import {
  Box,
  Checkbox,
  createTheme,
  FormControlLabel,
  FormGroup,
  Slider,
  ThemeProvider,
} from "@mui/material";
import { Collapse, Divider, Switch } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";

const theme = createTheme({
  direction: "rtl", // فعال کردن RTL برای تم MUI
});

function SelectCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
  });


  const [valuePrice, setValuePrice] = useState([0, 100000]);
  const [valueCategory, setValueCategory] = useState([]);
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    const urlCategories = searchParams.get("category") || "";
    setFilters({
      category: urlCategories ? urlCategories.split(",") : [],
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    });
    setValuePrice([
      searchParams.get("minPrice") || 0,
      searchParams.get("maxPrice") || 100000,
    ]);

    if (searchParams.get("category")) {
      setValueCategory(searchParams.get("category").split(",") || []);
    } else {
      setValueCategory([]);
    }

    // Set active keys based on search params
    const keys = [];
    if (searchParams.get("minPrice") || searchParams.get("maxPrice")) {
      keys.push("3"); // Price range section key
    }
    if (searchParams.get("category")) {
      keys.push("1"); // Category section key
    }
    setActiveKeys(keys);
  }, [searchParams]);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    if (newFilters.category.length > 0)
      params.set("category", newFilters.category.join(","));
    else
      params.delete("category");

    if (newFilters.minPrice && newFilters.minPrice !== 0) 
      params.set("minPrice", newFilters.minPrice);
    else
      params.delete("minPrice");

    if (newFilters.maxPrice && newFilters.maxPrice !== 100000)
      params.set("maxPrice", newFilters.maxPrice);
    else
      params.delete("maxPrice");

    router.push(`/product?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = () => {
    const newFilters = {
      ...filters,
      minPrice: valuePrice[0],
      maxPrice: valuePrice[1],
      category: valueCategory,
    };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      category: [],
      minPrice: "",
      maxPrice: "",
    });
    router.push("/product", { scroll: false });
  };

  const handleChange = (event, newValue) => {
    setValuePrice(newValue);
  };

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  const outerItems = [
    {
      key: "1",
      label: (
        <div className="text-[16px] font-semibold select-none">دسته بندی</div>
      ),
      children: (
        <Collapse
          ghost
          items={[
            {
              key: "A",
              label: <div className="select-none">همه کالاها</div>,
              children: (
                <div>
                  <FormGroup dir="ltr">
                    {Array(3)
                      .fill(null)
                      .map((e, i) => (
                        <div key={i}>
                          <FormControlLabel
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              p: 0,
                              m: 0,
                            }}
                            control={<Checkbox />}
                            label={
                              <div
                                style={{ fontFamily: "Yekan" }}
                                className="select-none text-sm font-semibold"
                              >
                                محصول شماره {i + 1}
                              </div>
                            }
                          />
                          <Divider style={{ margin: 0, padding: 0 }} />
                        </div>
                      ))}
                  </FormGroup>
                </div>
              ),
            },
            {
              key: "B",
              label: <div className="select-none">دوربین عکاسی</div>,
              children: (
                <div>
                  <FormGroup dir="ltr">
                    {Array(3)
                      .fill(null)
                      .map((e, i) => (
                        <div key={i}>
                          <FormControlLabel
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              p: 0,
                              m: 0,
                            }}
                            control={<Checkbox />}
                            label={
                              <div
                                style={{ fontFamily: "Yekan" }}
                                className="select-none text-sm font-semibold"
                              >
                                دوربین شماره {i + 1}
                              </div>
                            }
                          />
                          <Divider style={{ margin: 0, padding: 0 }} />
                        </div>
                      ))}
                  </FormGroup>
                </div>
              ),
            },
            {
              key: "C",
              label: <div className="select-none">لنز</div>,
              children: (
                <div>
                  <FormGroup dir="ltr">
                    {Array(2)
                      .fill(null)
                      .map((e, i) => (
                        <div key={i}>
                          <FormControlLabel
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              p: 0,
                              m: 0,
                            }}
                            control={<Checkbox />}
                            label={
                              <div
                                style={{ fontFamily: "Yekan" }}
                                className="select-none text-sm font-semibold"
                              >
                                لنز شماره {i + 1}
                              </div>
                            }
                          />
                          <Divider style={{ margin: 0, padding: 0 }} />
                        </div>
                      ))}
                  </FormGroup>
                </div>
              ),
            },
          ]}
          expandIcon={({ isActive }) => (
            <FaAngleUp className={isActive ? "rotateico" : "ico"} />
          )}
        />
      ),
    },
    {
      key: "2",
      label: <div className="text-[16px] font-semibold select-none">برند</div>,
      children: (
        <div>
          <FormGroup>
            {[
              { nameFa: "سونی", nameEn: "sony" },
              { nameFa: "کنون", nameEn: "canon" },
            ].map((e, i) => (
              <div key={i}>
                <FormControlLabel
                  onChange={() => {
                    if (valueCategory.includes(e.nameEn)) {
                      setValueCategory(
                        valueCategory.filter((ev) => ev !== e.nameEn)
                      );
                    } else {
                      setValueCategory([...valueCategory, e.nameEn]);
                    }
                  }}
                  sx={{
                    width: "100%",

                    p: 0,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      width: "100%",
                    },
                  }}
                  control={
                    <Checkbox checked={valueCategory.includes(e.nameEn)} />
                  }
                  label={
                    <div
                      style={{ fontFamily: "Yekan" }}
                      className="select-none text-sm font-semibold w-full flex justify-between"
                    >
                      <span className="w-full">{e.nameFa}</span>
                      <span>{e.nameEn}</span>
                    </div>
                  }
                />
                <Divider style={{ margin: 0, padding: 0 }} />
              </div>
            ))}
          </FormGroup>
          <div className="flex justify-between items-center pt-8 pb-3">
            <span className="font-semibold">نمایش محصولات موجود </span>
            <Switch style={{ color: "red" }} defaultChecked />
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
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={valuePrice}
              onChange={handleChange}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-rail": {
                  backgroundColor: "#d8d8d8", // رنگ پس‌زمینه
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#40768c", // رنگ مسیر فعال
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#40768c", // رنگ دستگیره
                  transform: "translate(50%, -50%)",
                },
                direction: "rtl", // جهت را به چپ‌به‌رست نگه می‌داریم
              }}
              min={0}
              max={100000}
              step={100}
            />
          </ThemeProvider>
          <div className="bg-[#f0f0f0] p-3 rounded-sm flex justify-center select-none">
            از <span className="font-semibold px-1">{valuePrice[0]}</span> تا
            <span className="font-semibold px-1">{valuePrice[1]}</span> تومان
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between pb-10">
        <h4 className="font-semibold text-lg">فیلترها</h4>
        <div
          onClick={handleResetFilters}
          className="flex items-center cursor-pointer"
        >
          <IoCloseOutline className="text-red-600 text-xl" />
          <span className="text-red-600 text-sm font-semibold">
            حذف فیلتر‌ها
          </span>
        </div>
      </div>
      <Collapse
        ghost
        expandIconPosition="end"
        items={outerItems}
        activeKey={activeKeys}
        onChange={handleCollapseChange}
        expandIcon={({ isActive }) => (
          <FaAngleUp className={isActive ? "rotateico" : "ico"} />
        )}
      />
      <div className="px-3 mt-2">
        <button
          onClick={handleFilterChange}
          className="bg-[#18d1be] w-full rounded-lg duration-300 text-white hover:bg-[#d1182b] py-2 font-bold text-[16px] cursor-pointer"
        >
          اعمال
        </button>
      </div>
    </>
  );
}

export default SelectCategoryFilter;
