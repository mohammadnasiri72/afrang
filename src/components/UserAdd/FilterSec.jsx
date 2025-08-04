"use client";
import {
  getUserAdFilter,
  getUserAdFilter2,
} from "@/services/UserAd/UserAdServices";
import { Checkbox, Collapse, Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import CheckBoxCaterory from "./CheckBoxCaterory";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

 // تنظیمات Toast
  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: "toast-modal",
  });

const theme = createTheme({
  direction: "rtl", // فعال کردن RTL برای تم MUI
});

function FilterSec() {
  const [valuePrice, setValuePrice] = useState([0, 1000000000]);
  const [filterList, setFilterList] = useState({});
  const [openCollapsePrice, setOpenCollapsePrice] = useState(true);
  const [openCollapseCategory, setOpenCollapseCategory] = useState(true);
  const [categoryChecked, setCategoryChecked] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const price1 = searchParams.get("price1") || undefined;
  const price2 = searchParams.get("price2") || undefined;
  const categoryParams = searchParams.getAll("category");

  const { activeTab } = useSelector((state) => state.activeTab);

  

  useEffect(() => {
    if (price1 && price2) {
      setValuePrice([price1, price2]);
    }
    if (!price1 && !price2 && filterList.maxPrice) {
      setValuePrice([0, filterList.maxPrice]);
    }
  }, [price1, price2, filterList]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const filtersData =
          activeTab === 1
            ? await getUserAdFilter()
            : activeTab === 2
            ? await getUserAdFilter2()
            : [];
            if (filtersData?.type === "error") {
        Toast.fire({
          icon: "error",
          title: productsData.message,
        });
        return;
      }
        setFilterList(filtersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchFilterData();
  }, [activeTab]);

  // مقداردهی اولیه categoryChecked بر اساس پارامترهای URL
  useEffect(() => {
    if (filterList?.categories?.length > 0) {
      const initialCategories = filterList.categories.filter((cat) =>
        categoryParams.includes(cat.id.toString())
      );
      setCategoryChecked(initialCategories);
    }
  }, [filterList, searchParams]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <img
          className="h-64 w-full object-cover"
          src="/images/gallery/news-thumb-large.jpg"
          alt=""
        />
        {activeTab === 1 && (
          <div>
            <div
              onClick={() => {
                setOpenCollapsePrice((e) => !e);
              }}
              className="border-b-2 border-b-[#3335] my-5 cursor-pointer"
            >
              <span className="flex justify-between items-center">
                <span className="text-lg font-bold border-b-4 border-[#d1182b] select-none">
                  بر اساس قیمت
                </span>
                <FaChevronDown
                  className={`duration-300 ${
                    openCollapsePrice ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>
            <Collapse in={openCollapsePrice} timeout="auto" unmountOnExit>
              <ThemeProvider theme={theme}>
                <div className="px-4">
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={valuePrice}
                    onChange={(event, newValue) => {
                      setValuePrice(newValue);
                    }}
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
                    max={filterList?.maxPrice}
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
                  onClick={() => {
                    params.set("price1", valuePrice[0]);
                    params.set("price2", valuePrice[1]);
                    params.delete("page");
                    router.push(
                      `${window.location.pathname}?${params.toString()}`
                    );
                  }}
                  className="bg-[#18d1be] w-full rounded-lg duration-300 text-white hover:bg-[#d1182b] py-2 font-bold text-[16px] cursor-pointer"
                >
                  اعمال فیلتر قیمت
                </button>
              </div>
            </Collapse>
          </div>
        )}
        <div>
          <div
            onClick={() => {
              setOpenCollapseCategory((e) => !e);
            }}
            className="border-b-2 border-b-[#3335] my-5 cursor-pointer"
          >
            <span className="flex justify-between items-center">
              <span className="text-lg font-bold border-b-4 border-[#d1182b] select-none">
                دسته بندی
              </span>
              <FaChevronDown
                className={`duration-300 ${
                  openCollapseCategory ? "rotate-180" : ""
                }`}
              />
            </span>
          </div>
          <Collapse in={openCollapseCategory} timeout="auto" unmountOnExit>
            <div className="flex flex-col items-start ">
              {filterList?.categories?.length > 0 &&
                filterList.categories.map((item) => (
                  <CheckBoxCaterory
                    key={item.id}
                    category={item}
                    categoryChecked={categoryChecked}
                    setCategoryChecked={setCategoryChecked}
                  />
                ))}
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
}

export default FilterSec;
