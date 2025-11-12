"use client";

import { setFilterLoading } from "@/redux/features/filterLoadingSlice";
import { Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { Collapse } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleUp, FaSearch } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useDispatch } from "react-redux";

function FilterProperties({ filterData, startTransition }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [propertySearches, setPropertySearches] = useState({});
  const [activeKeys, setActiveKeys] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState({});

  useEffect(() => {
    // خواندن properties انتخاب شده از URL در لود اولیه
    const params = new URLSearchParams(searchParams.toString());

    const initialSelectedProperties = {};

    filterData?.forEach((property) => {
      const paramName = `attr_${property.id}`;
      const paramValue = params.get(paramName);

      if (paramValue) {
        // استفاده از decodeURIComponent برای تبدیل %2C به ,
        const decodedValue = decodeURIComponent(paramValue);
        initialSelectedProperties[property.id] = decodedValue.split(",");
      }
    });

    setSelectedProperties(initialSelectedProperties);
  }, [searchParams, filterData]);

  // تابع برای گرفتن عنوان مقادیر انتخاب شده
  const getSelectedValuesTitles = (property) => {
    const selectedIds = selectedProperties[property.id] || [];
    if (selectedIds.length === 0) return [];

    return selectedIds.map((id) => property.values?.[id] || "").filter(Boolean);
  };

  // تابع برای بررسی آیا ویژگی‌ای انتخاب شده است
  const hasSelectedValues = (property) => {
    return (selectedProperties[property.id] || []).length > 0;
  };

  const handlePropertyChange = (propertyId, valueId) => {
    dispatch(setFilterLoading(true));

    const currentSelected = selectedProperties[propertyId] || [];
    let newSelected;

    if (currentSelected.includes(valueId)) {
      newSelected = currentSelected.filter((id) => id !== valueId);
    } else {
      newSelected = [...currentSelected, valueId];
    }

    const newSelectedProperties = {
      ...selectedProperties,
      [propertyId]: newSelected,
    };

    setSelectedProperties(newSelectedProperties);

    // ساخت URL جدید بدون استفاده از URLSearchParams برای کاما
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    const paramName = `attr_${propertyId}`;

    if (newSelected.length > 0) {
      params.set(paramName, newSelected.join(","));
    } else {
      params.delete(paramName);
    }

    // ساخت URL دستی برای جلوگیری از encode شدن کاما
    const baseUrl = window.location.pathname;
    const queryString = params.toString().replace(/%2C/g, ",");
    const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    startTransition(() => {
      router.push(newUrl);
    });
  };

  const handleCollapseChange = (keys) => {
    setActiveKeys(keys);
  };

  const handlePropertySearchChange = (propertyId, searchValue) => {
    setPropertySearches((prev) => ({
      ...prev,
      [propertyId]: searchValue,
    }));
  };

  const getFilteredPropertyValues = (property) => {
    const searchValue = propertySearches[property.id] || "";
    const values = Object.entries(property.values || {});

    if (!searchValue) return values;

    return values.filter(([valueId, valueTitle]) =>
      valueTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const renderPropertyValues = (property) => {
    const filteredValues = getFilteredPropertyValues(property);

    if (filteredValues.length === 0) {
      return (
        <div className="text-center py-4 text-gray-500">
          {propertySearches[property.id]
            ? "مقداری با این جستجو یافت نشد"
            : "مقداری برای این ویژگی وجود ندارد"}
        </div>
      );
    }

    return filteredValues.map(([valueId, valueTitle]) => (
      <div key={valueId}>
        <FormControlLabel
          onChange={() => handlePropertyChange(property.id, valueId)}
          sx={{
            width: "100%",
            p: 0,
            m: 0,
            "& .MuiFormControlLabel-label": {
              width: "100%",
            },
          }}
          control={
            <Checkbox
              checked={(selectedProperties[property.id] || []).includes(
                valueId
              )}
            />
          }
          label={
            <div
              style={{ fontFamily: "Yekan" }}
              className="select-none text-sm font-semibold w-full flex items-center justify-between"
            >
              <span className="w-full line-clamp-1">{valueTitle}</span>
            </div>
          }
        />
        <Divider style={{ margin: 0, padding: 0 }} />
      </div>
    ));
  };

  const renderProperties = () => {
    if (!filterData || filterData.length === 0) {
      return [];
    }

    return filterData.map((property) => {
      const selectedTitles = getSelectedValuesTitles(property);
      const hasSelections = hasSelectedValues(property);

      return {
        key: property.id.toString(),
        label: (
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-semibold select-none">
                {property.title}
              </span>
              {hasSelections && (
                <GoDotFill className="text-teal-500 text-sm" />
              )}
            </div>
            {hasSelections && (
              <div className="text-xs text-gray-500 font-medium line-clamp-1">
                {selectedTitles.join("، ")}
              </div>
            )}
          </div>
        ),
        children: (
          <div>
            {/* سرچ باکس فقط وقتی نمایش داده شود که آیتم‌ها بیشتر از ۵ تا باشند */}
            {Object.keys(property.values || {}).length > 10 && (
              <div className="!mb-3 relative">
                <input
                  type="text"
                  placeholder={`جستجو در ${property.title}...`}
                  value={propertySearches[property.id] || ""}
                  onChange={(e) =>
                    handlePropertySearchChange(property.id, e.target.value)
                  }
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1182b] focus:border-transparent !text-[16px]"
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            )}

            {/* لیست مقادیر فیلتر شده */}
            <div
              className="overflow-y-auto px-2"
              style={{ maxHeight: "250px" }}
            >
              <FormGroup>{renderPropertyValues(property)}</FormGroup>
            </div>
          </div>
        ),
      };
    });
  };

  const shouldShowCollapse = filterData && filterData.length > 0;

  return (
    <div>
      <h4 className="font-semibold text-lg mb-4">ویژگی‌های محصول</h4>

      {shouldShowCollapse ? (
        <Collapse
          ghost
          expandIconPosition="end"
          items={renderProperties()}
          activeKey={activeKeys}
          onChange={handleCollapseChange}
          expandIcon={({ isActive }) => (
            <FaAngleUp className={isActive ? "rotateico" : "ico"} />
          )}
          className="[&_.ant-collapse-content]:!px-0 [&_.ant-collapse-item]:!border-0 [&_.ant-collapse-header]:!px-0 [&_.ant-collapse-content-box]:!px-0"
        />
      ) : (
        <div className="text-center py-8 text-gray-500">
          هیچ ویژگی‌ای برای نمایش وجود ندارد
        </div>
      )}
    </div>
  );
}

export default FilterProperties;
