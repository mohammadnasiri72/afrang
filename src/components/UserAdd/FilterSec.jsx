"use client";
import { getUserAdFilter } from "@/services/UserAd/UserAdServices";
import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";

const theme = createTheme({
  direction: "rtl", // فعال کردن RTL برای تم MUI
});

function FilterSec() {
  const [valuePrice, setValuePrice] = useState([0, 1000000000]);
  const [filterList, setFilterList] = useState({});

  console.log(filterList);

  useEffect(()=>{
    if (filterList.maxPrice) {
        setValuePrice([0,filterList.maxPrice])
    }
  },[filterList])

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const filtersData = await getUserAdFilter();
        setFilterList(filtersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };
    fetchFilterData();
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 z-50 relative w-full">
        <img
          className="h-64 w-full object-cover"
          src="/images/gallery/news-thumb-large.jpg"
          alt=""
        />
        <div>
            <div className="border-b-2 border-b-[#3335] my-5">
                <span className=" text-lg font-bold border-b-4 border-[#d1182b]">بر اساس قیمت</span>
            </div>
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
              //   onClick={handleFilterChange}
              className="bg-[#18d1be] w-full rounded-lg duration-300 text-white hover:bg-[#d1182b] py-2 font-bold text-[16px] cursor-pointer"
            >
              اعمال فیلتر قیمت
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSec;
